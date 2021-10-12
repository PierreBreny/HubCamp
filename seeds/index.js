const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cities =  require('./cities')
const {places, descriptors} = require("./seedHelpers")
const Campground = require("../models/campground");

dotenv.config();

// Mongoose config
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology : true, useUnifiedTopology: true})
.then(() => console.log("Succesfully connected to Mongo!"))
.catch((err) => console.log(err));

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/483251",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, dolorem labore. Repellat reiciendis rem similique mollitia aperiam molestiae omnis voluptatibus cumque harum neque nostrum labore, eaque animi vel cum asperiores?",
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})