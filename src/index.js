require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const hotelRoute = require('./routes/hotel.route');

// CONNECT DATABASE
require('./config/dbConnect')


// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send("Hello")
});


app.use('/', hotelRoute);

app.listen(port, console.log('server is running'))