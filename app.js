/**
 * Created by Daniel on 2017. 2. 1..
 */
const express = require('express');
const app = express();
const gugudan = require('./gugudan');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(function (req, res, next) {
    console.log('Global Middleware');
    next();
});

app.get('/gugudan', function (req, res) {
    if(!req.query.num){
        res.send('Input Failure');
    }
    const result = gugudan.saveGugudanStr(parseInt(req.query.num, 10));
    res.render('gugudan', {
        result: result
    });
});

app.get('*', function (req, res) {
    res.send('Not Found');
});

app.listen(3000);
