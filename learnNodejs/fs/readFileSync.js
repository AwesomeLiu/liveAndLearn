'use strict';

var fs = require('fs');
// 同步读取文件
// 为防止读取文件时发生错误，需用try...catch捕获错误
try {
    var data = fs.readFileSync('sample.txt', 'utf-8');
    console.log(data);
} catch (err) {
    console.log(err);
}