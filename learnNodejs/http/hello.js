'use strict';

var http = require('http');

var server = http.createServer(function (request, response) {
    // 获得HTTP请求的method和url
    console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response
    response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');