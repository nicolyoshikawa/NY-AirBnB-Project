// backend/routes/api/users.js
const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, sequelize, ReviewImage } = require('../../db/models');

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

const validateReview = [
    check('review').exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars').exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5")
        .bail()
        .isLength({ min: 1,max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

//create a review for a spot
router.post('/:id/reviews', requireAuth, validateReview, async (req, res, next) => {
    const userId = req.user.id;
    const spotId = +req.params.id;
    const { review, stars } = req.body;

    const spotByID = await Spot.findByPk(spotId);
    if(!spotByID){
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    const reviewByID = await Review.findOne({
        where: { userId, spotId }
    });

    if(reviewByID){
        const err = new Error("User already has a review for this spot");
        err.status = 403;
        return next(err);
    }

    const newReview = await Review.create({ userId, spotId, review, stars});
    res.status(201);
    res.json(newReview);
});

//get all review by spot ID
router.get('/:id/reviews', requireAuth, async (req, res, next) => {
    const spotId = +req.params.id;
    const allReviews = {};
    const spotByID = await Spot.findByPk(spotId);
    if(!spotByID){
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    const reviewByID = await Review.findAll({
        where: { spotId },
        include: [
            { model: User },
            {
                model: ReviewImage,
                attributes: ["id", 'url']
            },
        ]
    });
    allReviews.Reviews = reviewByID
    res.json(allReviews);
});

//Get all spots
router.get('/', async (req, res) => {
    const all = {};
    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage
            },
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
            ]
        },
        group: ['Spot.id']

    });

    let spotsList = [];
    allSpots.forEach( spot  => {
        spotsList.push(spot.toJSON());
    });
    spotsList.forEach( spot => {
        spot.SpotImages.forEach(image => {
            if(image.preview === true){
                spot.previewImage = image.url
            }
        });
        if(!spot.previewImage){
            spot.previewImage = "no image found"
        }

        delete spot.SpotImages;
    })
    all.Spots = spotsList
    res.json(all);
});

//Get spots owned by current user
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
                model: SpotImage
            },
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

    let spotsList = [];
    spotOwnedByUser.forEach( spot  => {
        spotsList.push(spot.toJSON());
    });
    // console.log(spotsList)
    spotsList.forEach( spot => {
        spot.SpotImages.forEach(image => {
            if(image.preview === true){
                spot.previewImage = image.url
            }
        });
        if(!spot.previewImage){
            spot.previewImage = "no image found"
        }

        delete spot.SpotImages;
    })
    ownedSpot.Spots = spotsList;
    res.json(ownedSpot);

});

//Get details for a spot from an ID
router.get('/:id', async (req, res, next) => {
    const id = +req.params.id;

    const currentSpot = await Spot.findByPk(id, {
        include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview']},
            { model: User, as: "Owner" , attributes: ['id', 'firstName', 'lastName']}
        ]
    });
    if(!currentSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    } else {
        const avg = await Review.findAll({
            where: { spotId: currentSpot.id },
            attributes: [
                [sequelize.fn("COUNT", sequelize.col("Review.spotId")), "numReviews"],
                [sequelize.fn("AVG", sequelize.col("Review.stars")), "avgRating"]
            ]
        });

        const data = currentSpot.toJSON();
        // console.log(avg)
        const avgData = avg[0].toJSON();
        data.numReviews = avgData.numReviews;
        data.avgStarRating = avgData.avgRating;

        res.json(data);
    };
});

//add an image to a spot
router.post('/:id/images', requireAuth, async (req, res, next) => {
    const spotId = +req.params.id;
    const loggedInUser = req.user.id;
    const { url, preview } = req.body;
    let image = {};

    const spotByID = await Spot.findByPk(spotId);
    if(!spotByID){
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    } else if(loggedInUser !== spotByID.ownerId){
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }
    const newImage = await SpotImage.create({ url, spotId, preview });
    image.id = newImage.id;
    image.url = newImage.url;
    image.preview = newImage.preview;
    return res.json(image);
});

//create a spot
router.post('/', requireAuth, validateSpots, async (req, res, next) => {
    const ownerId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newSpot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId });
    res.status(201);
    return res.json(newSpot);
});

//edit a spot
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

//delete a spot
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
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
  }
);

module.exports = router;
