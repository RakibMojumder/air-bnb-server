const express = require('express');
const { addHotel, getSearchHotel, getFilterHotel, getHotelByCategory } = require('../controllers/hotel.controller');
const router = express.Router();

// router.route('/').get(getSearchResult).post(addHotel);
router.route('/search').get(getSearchHotel)
router.route('/filter').get(getFilterHotel)
router.route('/:category').get(getHotelByCategory)

module.exports = router;