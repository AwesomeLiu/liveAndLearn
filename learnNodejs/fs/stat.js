'use strict';

var fs = require('fs');
// 异步获取文件或目录信息
fs.stat('sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        console.log('isFile? ' + stat.isFile());
        console.log('isDirectory? ' + stat.isDirectory());
        if (stat.isFile()) {
            console.log('size: ' + stat.size + ' bytes');
            // 创建时间 Date对象
            console.log('birth time: ' + stat.birthtime);
            // 修改时间 Date对象
            console.log('modified time: ' + stat.mtime);
        }
    }
});
// 同步获取文件或目录信息
var statSync = fs.statSync('sample.png');
console.log('statSync.size: ' + statSync.size + ' bytes');