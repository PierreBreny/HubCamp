const express = require('express');
const router  = express.Router();
const Campground = require('../models/campground');
const wrapAsync = require('../utilities/wrapAsync');
const ExpressError = require('../utilities/ExpressError');

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
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
}))

// Add new
router.post('/', wrapAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

// GET Edit campground page
router.get('/:id/edit', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
}))

// Edit campground
router.put('/:id', wrapAsync(async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
}))

// GET Delete
router.delete('/:id', wrapAsync(async (req,res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

module.exports = router; 