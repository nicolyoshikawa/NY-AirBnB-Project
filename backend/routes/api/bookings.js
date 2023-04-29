const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, ReviewImage, Review, SpotImage, Booking, sequelize } = require('../../db/models');

const router = express.Router();

const validateBooking = [
    check('endDate').exists({ checkFalsy: true })
        .withMessage("endDate is required")
        .bail()
        .isDate()
        .withMessage("endDate is an invalid date")
        .bail()
        .custom((value, { req }) => {
            if(new Date(value) <= new Date(req.body.startDate)) {
                throw new Error ("endDate cannot come before startDate");
            }
            return true;
        }),
    check('startDate').exists({ checkFalsy: true })
        .withMessage("startDate is required")
        .bail()
        .isDate()
        .withMessage("startDate is an invalid date"),
  handleValidationErrors
];

//Get current user's bookings
router.get('/currentUser', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const bookings = {};
    const userBookings = await Booking.findAll({
        where: { userId },
        include: [
            {
                model: User,
                attributes: []
            },
            {
                model: Spot,
                attributes: { exclude: ['description', 'createdAt', 'updatedAt'] },
                include: [
                    { model: SpotImage }
                ],
            }
        ]
    })

    let arr = [];
    userBookings.forEach(booked => {
        let bookingsObj = booked.toJSON();

        let spotObj = bookingsObj.Spot;

        if(spotObj && spotObj.SpotImages){
            spotObj.SpotImages.forEach(image => {
                if(image.preview === true){
                    spotObj.previewImage = image.url;
                }
            });
        }

        if(!spotObj.previewImage){
            spotObj.previewImage = "no image found"
        }

        delete spotObj.SpotImages;
        arr.push(bookingsObj);
    });

    bookings.Bookings = arr;
    res.json(bookings);

});

//edit a Booking
router.put('/:id', requireAuth, validateBooking, async (req, res, next) => {
    const userId = req.user.id;
    const bookingId = +req.params.id;
    let { startDate, endDate } = req.body;

    let today = new Date()
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const bookingByID = await Booking.findByPk(bookingId);

    if(!bookingByID){
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }
    if(userId !== bookingByID.userId){
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }
    if(today > bookingByID.endDate){
        const err = new Error("Past bookings can't be modified");
        err.status = 403;
        return next(err);
    }
    if(endDate < startDate){
        const err = new Error("endDate cannot be on or before startDate");
        err.status = 404;
        return next(err);
    }

    const bookingsBySpotId = await Booking.findAll({
        where: { spotId: bookingByID.spotId, id: { [Op.not]: bookingId} },
    });

    for(let i = 0; i < bookingsBySpotId.length; i++){
        let currSpot = bookingsBySpotId[i];
        if(startDate <= currSpot.endDate && startDate >= currSpot.startDate){
            const err = new Error("Sorry, this spot is already booked for the specified dates");
            err.status = 403;
            err.errors = [
                "Start date conflicts with an existing booking"
            ];
            return next(err);
        }
        if(endDate <= currSpot.endDate && endDate >= currSpot.startDate){
            const err = new Error("Sorry, this spot is already booked for the specified dates");
            err.status = 403;
            err.errors = [
                "End date conflicts with an existing booking"
            ];
            return next(err);
        }
        if(endDate >= currSpot.endDate && startDate <= currSpot.startDate){
            const err = new Error("Sorry, this spot is already booked for the specified dates");
            err.status = 403;
            err.errors = [
                "End date conflicts with an existing booking"
            ];
            return next(err);
        }
    }

    if(startDate) bookingByID.startDate = startDate;
    if(endDate) bookingByID.endDate = endDate;

    const updated = await bookingByID.save();
    return res.json(updated);

});

//delete a Booking
router.delete('/:id', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const bookingId = +req.params.id;
    let today = new Date();

    const bookingByID = await Booking.findByPk(bookingId, {
        include: {
            model: Spot
        }
    });

    if(!bookingByID){
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }
    if(userId === bookingByID.userId || userId === bookingByID.Spot.ownerId){
        if(today >= bookingByID.startDate){
            const err = new Error("Bookings that have been started can't be deleted");
            err.status = 403;
            return next(err);
        }

        await bookingByID.destroy();
        res.status(200);

        return res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    } else {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }
});

module.exports = router;
