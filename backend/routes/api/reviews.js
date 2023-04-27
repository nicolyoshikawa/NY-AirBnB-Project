// backend/routes/api/users.js
const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, ReviewImage, Review, SpotImage, sequelize } = require('../../db/models');

const router = express.Router();

const validateReview = [
    check('review').exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars').exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5")
        .bail()
        .isInt({ min: 1,max: 5 })
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
                attributes: { exclude: ['description', 'createdAt', 'updatedAt'] },
                include: [
                    { model: SpotImage }
                ],
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },
        ]
    })

    let arr = [];
    reviewUser.forEach(review => {
        let reviewObj = review.toJSON();

        let spotObj = reviewObj.Spot;

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
        arr.push(reviewObj);
    });

    reviews.Reviews = arr;
    res.json(reviews);

});

//add an image to a Review
router.post('/:id/images', requireAuth, async (req, res, next) => {
    const reviewId = +req.params.id;
    const userId = req.user.id;
    const { url } = req.body;
    const image = {};
    const reviewByID = await Review.findByPk(reviewId);

    if(!reviewByID){
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    } else if(userId !== reviewByID.userId){
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    };

    const reviewImageCount = await ReviewImage.count({
        where: { reviewId }
    });
    if(reviewImageCount >= 10){
        const err = new Error("Maximum number of images for this resource was reached");
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

//delete a review image
router.delete('/:id/images/:imageId', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const reviewId = +req.params.id;
    const imageId = +req.params.imageId;
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

    const imageByID = await ReviewImage.findByPk(imageId, {
        where: reviewId
    });
    if(!imageByID){
        const err = new Error("Review Image couldn't be found");
        err.status = 404;
        return next(err);
    }

    await imageByID.destroy();
    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
  }
);

module.exports = router;
