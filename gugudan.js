/**
 * Created by Daniel on 2017. 2. 1..
 */
var fs = require('fs');

const MAX = 9;

function printGugudan() {
    var result = '';
    for(var i = 2 ; i <= MAX ; i++){
        for(var j = 1 ; j <= MAX ; j++){
            result += `${i}*${j} = ${i*j}\n`;
        }
    }
    return result;
}


function saveGugudanStr(num) {
    var result = '';
    if(typeof num === 'number' && num > 0){
        for(var i = 1 ; i <= MAX ; i++){
            result += `${num}*${i}=${num*i}\t\n`
        }
    }
    else{
        result = 'Input Error';
    }
    return result;
}

function writeAndWriteFile(result) {
    fs.writeFile('result.txt', result, (err) => {
        if (err) throw err;
        console.log('Write Success');
        fs.readFile('result.txt', 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data);
        });
    });
}

module.exports = {
    saveGugudanStr: saveGugudanStr,
    writeAndWriteFile: writeAndWriteFile
};

