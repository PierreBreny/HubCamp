const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const Campground = require("./models/campground");
const expressEjsLayout = require ('express-ejs-layouts');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");

dotenv.config();

// Mongoose config
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology : true, useUnifiedTopology: true})
.then(() => console.log("Succesfully connected to Mongo!"))
.catch((err) => console.log(err));

const app = express();

// EJS
app.engine('ejs', ejsMate);
app.set('view engine','ejs');
// Static files for css
app.use("/static", express.static("public"));
// Method override
app.use(methodOverride('_method'));
//BodyParser
app.use(express.urlencoded({extended : true}));


app.get('/', (req, res) => {
    res.render('home');
})

//Routes
app.use('/', require('./routes/index'));
app.use('/campgrounds', require('./routes/campgrounds'));



app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running!")
})