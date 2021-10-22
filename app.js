const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const expressEjsLayout = require ('express-ejs-layouts');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require('./utilities/ExpressError');

dotenv.config();

// Mongoose config
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology : true, useUnifiedTopology: true})
.then(() => console.log("Succesfully connected to Mongo!"))
.catch((err) => console.log(err));

const app = express();

// EJS
app.engine('ejs', ejsMate);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'))
// Static files for css
app.use(express.static(path.join(__dirname, 'public')));
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
app.use('/campgrounds/:id/reviews', require('./routes/reviews'));

// Page not found
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})
// Error handler
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = "Oops! Something went wrong."
    res.status(statusCode).render('error', { err });
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running!")
})