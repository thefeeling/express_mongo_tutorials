/**
 * Created by dev on 2017. 2. 2..
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.56.101/todo');
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});