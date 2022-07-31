'use strict'

var fs = require('fs');
// 读取文件编码为utf-8的文件sample.txt
fs.readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
// 读取二进制文件
fs.readFile('sample.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + ' bytes');
    }
});
// 当读取二进制文件时，不传入文件编码时，回调函数的data参数将返回一个Buffer对象
// 把一个Buffer对象转换成String
// var text = data.toString('utf-8');
// 把一个String转换成Buffer
// var buf = new Buffer(text, 'utf-8');