const express = require('express');
const router  = express.Router();
const Campground = require('../models/campground');

// Homepage with all campgrounds

router.get('/', async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
})

// GET Add campground
router.get('/new', (req,res) => {
    res.render('campgrounds/new');
})

// Get campground by :id
router.get('/:id', async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
})

// Add new
router.post('/', async (req, res, next) => {
    try {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
    }catch(e){
        next(e);
    }
})

// GET Edit campground page
router.get('/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
})

// Edit campground
router.put('/:id', async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
})

// GET Delete
router.delete('/:id', async (req,res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

router.use((err, req, res, next) => {
    res.send("Something went wrong!")
})

module.exports = router; 