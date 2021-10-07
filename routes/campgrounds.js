const express = require('express');
const router  = express.Router();
const Campground = require('../models/campground');

// Homepage with listings

router.get('/', async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
})



module.exports = router; 