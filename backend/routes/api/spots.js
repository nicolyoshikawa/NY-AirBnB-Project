// backend/routes/api/users.js
const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, sequelize } = require('../../db/models');
const { all } = require('./spots');

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
            }
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
            ]
        },
        group: ['Spot.id']

    });
    all.Spots = allSpots;
    res.json(all);
});

router.get('/currentUser', requireAuth, async (req, res, next) => {

});

router.get('/:id', async (req, res, next) => {
    const id = +req.params.id;

    const currentSpot = await Spot.findByPk(id, {
        include: [
            { model: SpotImage, attributes: ['id', 'url']},
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
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = 4;
    const newSpot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId });

    return res.json(newSpot);
});

module.exports = router;
