const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const Campground = require("./models/campground");
const expressEjsLayout = require ('express-ejs-layouts');
const app = express();

dotenv.config();

// Static files for css
app.use("/static", express.static("public"));

// Mongoose config
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology : true, useUnifiedTopology: true})
.then(() => console.log("Succesfully connected to Mongo!"))
.catch((err) => console.log(err));

//EJS
app.set('view engine','ejs');

//BodyParser
app.use(express.urlencoded({extended : false}));

app.get('/', (req, res) => {
    res.render('home');
})

//Routes
app.use('/', require('./routes/index'));
app.use('/campgrounds', require('./routes/campgrounds'));



app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running!")
})