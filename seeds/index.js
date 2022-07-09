const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => {
    console.log("Database connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '62c64dab20c0ace3a8897d5c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sunt quae officia architecto, quibusdam nesciunt consequuntur consectetur consequatur unde temporibus excepturi soluta impedit sequi expedita molestias iure, quia, assumenda illo!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/doyayes9t/image/upload/v1657318446/YelpCamp/kboumcif54jfpmtlwcrd.jpg',
                    filename: 'YelpCamp/kboumcif54jfpmtlwcrd',
                },
                {
                    url: 'https://res.cloudinary.com/doyayes9t/image/upload/v1657318446/YelpCamp/piwpopj3c5tstuhbe52u.jpg',
                    filename: 'YelpCamp/piwpopj3c5tstuhbe52u',
                },
                {
                    url: 'https://res.cloudinary.com/doyayes9t/image/upload/v1657318448/YelpCamp/zt0yqjm02hmlm7uxo36o.jpg',
                    filename: 'YelpCamp/zt0yqjm02hmlm7uxo36o',
                },
                {
                    url: 'https://res.cloudinary.com/doyayes9t/image/upload/v1657318449/YelpCamp/i3i1nxzpoeiflf64hqqe.jpg',
                    filename: 'YelpCamp/i3i1nxzpoeiflf64hqqe',
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})