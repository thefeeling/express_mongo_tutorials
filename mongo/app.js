const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
const mongo = require('./route');

dotenv.config();
require('./database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/mongo' , mongo);


app.listen(3000);