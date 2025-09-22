const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/help-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const price=Math.floor(Math.random()*500)+500;
        const camp = new Campground({
            author:'686e7a1886981479648522d8',
            location: `${cities[i].city}, ${cities[i].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[i].longitude,
                    cities[i].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/du1uwq1tu/image/upload/v1752259360/GFgISVJWIAA3NVO_xqak8p.jpg',
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                },
                {
                    url: 'https://res.cloudinary.com/du1uwq1tu/image/upload/v1752259360/GFgISVJWIAA3NVO_xqak8p.jpg',
                    filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                }
            ]  ,
               description:'Nice Place',
            price:price
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
