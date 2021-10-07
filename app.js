const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const Campground = require("./models/campground");

dotenv.config();

// Mongoose config
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology : true, useUnifiedTopology: true})
.then(() => console.log("Succesfully connected to Mongo!"))
.catch((err) => console.log(err));

const app = express();


app.use(expressEjsLayout);

//BodyParser
app.use(express.urlencoded({extended : false}));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})

//Routes
app.use('/campgrounds',require('./routes/campgrounds'));


app.listen(3000, () => {
    console.log("Server is running!")
})