/**
 * Created by Daniel on 2017. 2. 1..
 */


const http = require('http');
const url = require('url');
const gugu = require('./gugudan');

console.log(gugu);

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const num = query.num && parseInt(query.num, 10);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(gugu.saveGugudanStr(num));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});