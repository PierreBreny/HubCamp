const express = require("express");
const mongoose = require("mongoose");
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log("Server is running!")
})