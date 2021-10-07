const express = require('express');
const router  = express.Router();
const Campground = require('../models/campground');

// Homepage with listings

router.get('/', (req,res) => {
    res.render('campgrounds/index');
})

module.exports = router; 