const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch(e => console.log(e.message))