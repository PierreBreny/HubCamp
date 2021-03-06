const express = require('express');
const router  = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Review = require('../models/review');
const wrapAsync = require('../utilities/wrapAsync');
const ExpressError = require('../utilities/ExpressError');
const { reviewSchema } = require("../schemas")

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// Add Review
router.post('/', validateReview, wrapAsync(async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Your review has been saved.')
    res.redirect(`/campgrounds/${campground._id}`)
}))

// Delete Review
router.delete('/:reviewId', wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Your review has been deleted.')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router; 