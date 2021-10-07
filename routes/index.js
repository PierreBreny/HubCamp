const express = require('express');
const router  = express.Router();


// Homepage with listings

router.get('/', (req,res) => {
    res.render('home');
})

module.exports = router; 