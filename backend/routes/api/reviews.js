// backend/routes/api/users.js
const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, ReviewImage, Review, sequelize } = require('../../db/models');

const router = express.Router();

const validateReview = [
    check('review').exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars').exists({ checkFalsy: true })
        .withMessage("Please enter your stars: 1 - 5")
        .bail()
        .isLength({ min: 1,max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];


//Get reviews made by current user
router.get('/currentUser', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const reviews = {};
    const reviewUser = await Review.findAll({
        where: { userId },
        include: [
            {
                model: User,
                attributes: { exclude: ['email', 'username', 'password', 'createdAt', 'updatedAt']}
            },
            {
                model: Spot,
                attributes: { exclude: ['description', 'createdAt', 'updatedAt']}
            },
            {
                model: ReviewImage
            },
        ]
    })
    if(reviewUser.length < 1) {
        const err = new Error("You currently have not written a review");
        return next(err);
    }

    // let spotsList = [];
    // allSpots.forEach( spot  => {
    //     spotsList.push(spot.toJSON());
    // });
    // spotsList.forEach( spot => {
    //     spot.SpotImages.forEach(image => {
    //         if(image.preview === true){
    //             spot.previewImage = image.url
    //         }
    //     });
    //     if(!spot.previewImage){
    //         spot.previewImage = "no image found"
    //     }

    //     delete spot.SpotImages;
    // })

    reviews.Reviews = reviewUser;
    res.json(reviews);

});

//Get details for a spot from an ID
router.get('/:id', async (req, res, next) => {
    // const id = +req.params.id;

    // const currentSpot = await Spot.findByPk(id, {
    //     include: [
    //         { model: SpotImage, attributes: ['id', 'url', 'preview']},
    //         { model: User, as: "Owner" , attributes: ['id', 'firstName', 'lastName']}
    //     ]
    // });
    // if(!currentSpot) {
    //     const err = new Error("Spot couldn't be found");
    //     err.status = 404;
    //     return next(err);
    // } else {
    //     const avg = await Review.findOne({
    //         where: { spotId: currentSpot.id },
    //         attributes: [
    //             [sequelize.fn("COUNT", sequelize.col("Review.spotId")), "numReviews"],
    //             [sequelize.fn("AVG", sequelize.col("Review.stars")), "avgRating"]
    //         ]
    //     });

    //     const data = currentSpot.toJSON();
    //     const avgData = avg.toJSON();
    //     data.numReviews = avgData.numReviews;
    //     data.avgStarRating = avgData.avgRating;

    //     res.json(data);
    // };
});

//add an image to a Review
router.post('/:id/images', requireAuth, async (req, res, next) => {
    // const spotId = +req.params.id;
    // const loggedInUser = req.user.id;
    // const { url, preview } = req.body;
    // let image = {};

    // const spotByID = await Spot.findByPk(spotId);
    // if(!spotByID){
    //     const err = new Error("Spot couldn't be found");
    //     err.status = 404;
    //     return next(err);
    // } else if(loggedInUser !== spotByID.ownerId){
    //     const err = new Error("Forbidden");
    //     err.status = 403;
    //     return next(err);
    // }
    // const newImage = await SpotImage.create({ url, spotId, preview });
    // image.id = newImage.id;
    // image.url = newImage.url;
    // image.preview = newImage.preview;
    // return res.json(image);
});

//edit a Review
router.put('/:id', requireAuth, validateReview, async (req, res, next) => {
    // const loggedInUser = req.user.id;
    // const spotId = +req.params.id;
    // let address = req.body.address;
    // let city = req.body.city;
    // let state = req.body.state;
    // let country = req.body.country;
    // let lat = req.body.lat;
    // let lng = req.body.lng;
    // let name = req.body.name;
    // let description = req.body.description;
    // let price = req.body.price;

});

//delete a Review
router.delete('/:id', requireAuth, async (req, res, next) => {
});

module.exports = router;
