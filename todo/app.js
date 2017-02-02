const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const todo = require('./route');

require('./database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/todo', todo);


app.listen(3000);