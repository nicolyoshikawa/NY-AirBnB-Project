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
        .withMessage("Stars must be an integer from 1 to 5")
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
                model: ReviewImage,
                attributes: ['id', 'url']
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

//add an image to a Review
router.post('/:id/images', requireAuth, async (req, res, next) => {
    const reviewId = +req.params.id;
    const userId = req.user.id;
    const { url } = req.body;
    const image = {};
    const reviewByID = await Review.findOne({
        where: { userId, id: reviewId }
    });
    const reviewCount = await ReviewImage.count({
        where: { reviewId }
    });
    if(reviewCount >= 10){
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;
        return next(err);
    }
    if(!reviewByID){
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    } else if(userId !== reviewByID.userId){
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }
    const newReviewImage = await ReviewImage.create({ reviewId, url });
    image.id = newReviewImage.id;
    image.url = newReviewImage.url;

    return res.json(image);
});

//edit a Review
router.put('/:id', requireAuth, validateReview, async (req, res, next) => {
    const userId = req.user.id;
    const reviewId = +req.params.id;
    const { review, stars } = req.body;
    const reviewByID = await Review.findByPk(reviewId);

    if(!reviewByID){
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    } else if(userId !== reviewByID.userId){
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    } else {
        if(review) reviewByID.review = review;
        if(stars) reviewByID.stars = stars;

        const updated = await reviewByID.save();
        return res.json(updated);
    }
});

//delete a Review
router.delete('/:id', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const reviewId = +req.params.id;
    const reviewByID = await Review.findByPk(reviewId);

    if(!reviewByID){
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }
    if(userId !== reviewByID.userId){
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    await reviewByID.destroy();
    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;
