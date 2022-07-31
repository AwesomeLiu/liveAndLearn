const WebSocket = require('ws');
// 应用Server类
const WebSocketServer = WebSocket.Server;
// 实例化
const wss = new WebSocketServer({
    port: 3000
});
// 如果有WebSocket请求接入，wss对象响应connection事件来处理WebSocket
wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    });
});