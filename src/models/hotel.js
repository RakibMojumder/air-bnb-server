const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    title: String,
    location: String,
    propertyType: String,
    category: String,
    price: Number,
    bed: Number,
    bathroom: Number,
    image: String,
    totalGuest: Number,
    wifi: Boolean,
    dryer: Boolean,
    kitchen: Boolean,
    washer: Boolean,
    airConditioner: Boolean
}, { timestamps: true });

module.exports = mongoose.model('hotels', hotelSchema);