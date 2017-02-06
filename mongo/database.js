/**
 * Created by dev on 2017. 2. 2..
 */
const mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.Promise = Promise;

mongoose.connect(process.env.DB_URL);

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});


