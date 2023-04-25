const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const moment = require('moment');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, ReviewImage, Review, SpotImage, Booking, sequelize } = require('../../db/models');

const router = express.Router();

const validateBooking = [
    // check('review').exists({ checkFalsy: true })
    //     .withMessage("Review text is required"),
    // check('stars').exists({ checkFalsy: true })
    //     .withMessage("Stars must be an integer from 1 to 5")
    //     .bail()
    //     .isLength({ min: 1,max: 5 })
    //     .withMessage('Stars must be an integer from 1 to 5'),
//   handleValidationErrors
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
    // if(reviewUser.length < 1) {
    //     const err = new Error("You currently have not written a review");
    //     return next(err);
    // }

    let obj = [];
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
        obj.push(bookingsObj);
    });

    bookings.Bookings = obj;
    res.json(bookings);

});

//edit a Booking
router.put('/:id', requireAuth, validateBooking, async (req, res, next) => {
    const userId = req.user.id;
    const bookingId = +req.params.id;
    const { startDate, endDate } = req.body;

    const bookingByID = await Booking.findByPk(bookingId, {
        where: { userId }
    });

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
    // if(date >= bookingByID.startDate){
    //     const err = new Error("Past bookings can't be modified");
    //     err.status = 403;
    //     return next(err);
    // }
    // if(startDate) bookingByID.startDate = startDate;
    // if(endDate) bookingByID.endDate = endDate;

    // const updated = await bookingByID.save();
    return res.json(updated);

});

//delete a Booking
router.delete('/:id', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const bookingId = +req.params.id;
    let today = new Date();

    const bookingByID = await Booking.findByPk(bookingId, {
        where: { userId }
    });

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
    if(today >= bookingByID.startDate){
        const err = new Error("Bookings that have been started can't be deleted");
        err.status = 403;
        return next(err);
    }

    // await bookingByID.destroy();
    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;
