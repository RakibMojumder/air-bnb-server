const Hotel = require('../models/hotel');

module.exports.addHotel = async (req, res) => {
    try {
        const data = await Hotel.create(req.body);
        res.send(data)
    } catch (error) {
        console.log(error);
    }
}


module.exports.getHotelByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const hotels = await Hotel.find({ category })

        res.json({
            success: true,
            message: 'Successfully got the hotels',
            data: hotels
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message,
            message: 'Can not get search result'
        })
    }
}


module.exports.getSearchHotel = async (req, res) => {
    try {
        const { guest, search } = req.query;

        let query = {};
        if (search) {
            query = { ...query, location: new RegExp(search, "i") }
        }

        if (guest > 0) {
            query = { ...query, totalGuest: { $lte: guest } }
        }

        const hotels = await Hotel.find(query);
        res.json({
            success: true,
            message: 'Successfully got the hotels',
            data: hotels
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message,
            message: 'Can not get search result'
        })
    }
}


module.exports.getFilterHotel = async (req, res) => {
    try {
        const query = req.query;

        const filter = [];
        if (query.bed) filter.push({ bed: parseInt(query.bed) });
        if (query.bathroom) filter.push({ bathroom: parseInt(query.bathroom) });
        if (query.property) filter.push({ propertyType: { $in: query.property.split(',') } })
        if (query.wifi) filter.push({ wifi: parseInt(query.wifi) })
        if (query.washer) filter.push({ washer: parseInt(query.washer) })
        if (query.dryer) filter.push({ dryer: parseInt(query.dryer) })
        if (query.kitchen) filter.push({ kitchen: parseInt(query.kitchen) })
        if (query.airConditioner) filter.push({ airConditioner: parseInt(query.airConditioner) })

        const priceFilter = [
            { price: { $gte: parseInt(query.min) } },
            { price: { $lte: parseInt(query.max) } },
        ]


        let hotels;
        if (filter.length > 0) {
            hotels = await Hotel.find({ $and: priceFilter, $and: filter })
        } else {
            hotels = await Hotel.find({ $and: priceFilter })
        }

        res.json({
            success: true,
            message: 'Successfully got the hotels',
            data: hotels
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message,
            message: 'Can not get search result'
        })
    }
}
