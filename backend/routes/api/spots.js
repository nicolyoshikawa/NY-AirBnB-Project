// backend/routes/api/users.js
const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage } = require('../../db/models');

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
    const allSpots = await Spot.findAll();
    all.Spots = allSpots;
    res.json(all);
});

router.get('/currentUser', requireAuth, async (req, res, next) => {

});

router.get('/:id', async (req, res, next) => {
    const id = +req.params.id;

    const currentSpot = await Spot.findByPk(id, {
        include: [
            { model: SpotImage },
            { model: User, as: "Owner" }
        ]
    });
    if(!currentSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    };

    res.json(currentSpot);
});

router.post('/', validateSpots, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = 4;
    const newSpot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId });

    return res.json(newSpot);
});

module.exports = router;
