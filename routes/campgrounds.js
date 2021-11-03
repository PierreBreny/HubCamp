const express = require('express');
const router  = express.Router();
const Campground = require('../models/campground');
const Review = require('../models/review');
const wrapAsync = require('../utilities/wrapAsync');
const ExpressError = require('../utilities/ExpressError');
const Joi = require("joi");
const { campgroundSchema, reviewSchema } = require("../schemas")

const validateCampground = (req, res, next) => {
        const { error } = campgroundSchema.validate(req.body)
        if(error){
            const msg = error.details.map(el => el.message).join(',');
            throw new ExpressError(msg, 400);
        } else {
            next();
        }
}

// Homepage with all campgrounds

router.get('/', async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
})

// GET Add campground page
router.get('/new', (req,res) => {
    res.render('campgrounds/new');
})

// Get campground by :id
router.get('/:id', wrapAsync(async (req,res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', {campground});
}))

// Add new
router.post('/', validateCampground, wrapAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}))

// GET Edit campground page
router.get('/:id/edit', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
}))

// Edit campground
router.put('/:id', validateCampground, wrapAsync(async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Your changes were saved!')
    res.redirect(`/campgrounds/${campground._id}`)
}))

// Delete campground
router.delete('/:id', wrapAsync(async (req,res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'The campground has been deleted.')
    res.redirect('/campgrounds');
}))

module.exports = router; 