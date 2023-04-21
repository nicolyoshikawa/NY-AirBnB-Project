// backend/routes/api/users.js
const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, sequelize } = require('../../db/models');

const router = express.Router();

const validateSpots = [
    check('address').exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city').exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state').exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country').exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat').exists({ checkFalsy: true })
        .withMessage("Latitude is not valid"),
    check('lng').exists({ checkFalsy: true })
        .withMessage("Longitude is not valid"),
    check('name').exists({ checkFalsy: true })
        .withMessage("Name is required")
        .bail()
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description').exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price').exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
  handleValidationErrors
];

router.get('/', async (req, res) => {
    const all = {};
    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: ['url'],
                where: {
                    preview: true
                }
            }
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
            ],

        },
        group: ['Spot.id']

    });
    all.Spots = allSpots;
    res.json(all);
});

router.get('/currentUser', requireAuth, async (req, res, next) => {
    const ownerId = req.user.id;
    const ownedSpot = {};
    const spotOwnedByUser = await Spot.findAll({
        where: { ownerId },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: ['url'],
                where: {
                    preview: true
                }
            }
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
            ]
        },
        group: ['Spot.id']
    })
    if(spotOwnedByUser.length < 1) {
        const err = new Error("You currently do not own a spot");
        return next(err);
    }
    ownedSpot.Spots = spotOwnedByUser;
    res.json(ownedSpot);

});

router.get('/:id', async (req, res, next) => {
    const id = +req.params.id;

    const currentSpot = await Spot.findByPk(id, {
        include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview']},
            { model: User, as: "Owner" , attributes: ['id', 'firstName', 'lastName']}
        ],
        attributes: { exclude: ['previewImg'] }
    });
    if(!currentSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    } else {
        const avg = await Review.findOne({
            where: { spotId: currentSpot.id },
            attributes: [
                [sequelize.fn("COUNT", sequelize.col("Review.spotId")), "numReviews"],
                [sequelize.fn("AVG", sequelize.col("Review.stars")), "avgRating"]
            ]
        });

        const data = currentSpot.toJSON();
        const avgData = avg.toJSON();
        data.numReviews = avgData.numReviews;
        data.avgStarRating = avgData.avgRating;

        res.json(data);
    };
});

router.post('/', requireAuth, validateSpots, async (req, res, next) => {
    const ownerId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newSpot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId });
    res.status(201);
    return res.json(newSpot);
});


router.put('/:id', requireAuth, validateSpots, async (req, res, next) => {
    const loggedInUser = req.user.id;
    const spotId = +req.params.id;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;
    let lat = req.body.lat;
    let lng = req.body.lng;
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;

    const spotByID = await Spot.findByPk(spotId);

    if(!spotByID){
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    } else if(loggedInUser !== spotByID.ownerId){
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    } else {
        if(address) spotByID.address = address;
        if(city) spotByID.city = city;
        if(state) spotByID.state = state;
        if(country) spotByID.country = country;
        if(lat) spotByID.lat = lat;
        if(lng) spotByID.lng = lng;
        if(name) spotByID.name = name;
        if(description) spotByID.description = description;
        if(price) spotByID.price = price;

        const updated = await spotByID.save();
        res.json(updated);
    }
  }
);

router.delete('/:id', requireAuth, async (req, res, next) => {
    const loggedInUser = req.user.id;
    const spotId = +req.params.id;
    const spotByID = await Spot.findByPk(spotId);

    if(!spotByID){
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    if(loggedInUser !== spotByID.ownerId){
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    await spotByID.destroy();
    res.status(200);
    return res.json({ message: "Successfully deleted"});
  }
);

module.exports = router;
