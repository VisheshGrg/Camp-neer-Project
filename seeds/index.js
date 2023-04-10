const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database Connected!");
})

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i=0; i<50; i++){
        const rand1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '6405da3fb597ad77586bff01',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos nisi nostrum cupiditate itaque a quisquam eos tenetur tempora reprehenderit accusamus officiis nobis beatae perspiciatis obcaecati quam magnam, nulla voluptatibus corrupti.',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dxcrwlhv0/image/upload/v1679398595/YelpCamp/panqhllkrnbkfnoo8b6b.jpg',
                  filename: 'YelpCamp/panqhllkrnbkfnoo8b6b',
                },
                {
                  url: 'https://res.cloudinary.com/dxcrwlhv0/image/upload/v1679398601/YelpCamp/m7eyimkltgunre17w3sm.jpg',
                  filename: 'YelpCamp/m7eyimkltgunre17w3sm',
                }
            ]
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});

