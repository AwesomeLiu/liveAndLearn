const url        = require('url');
const ws         = require('ws');
const Cookies    = require('cookies');
const Koa        = require('koa');
const bodyParser = require('koa-bodyparser');

const controller = require('./controller');
const templating = require('./templating');

const WebSocketServer = ws.Server;
const app = new Koa();
// log request URL
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
});
//从cookie解析用户
app.use(async (ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    await next();
});
// 静态文件支持
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));
// 解析请求体
app.use(bodyParser());
// 添加nunjucks作为视图
app.use(templating('views', {
    noCache: true,
    watch: true
}));
// 添加controller middleware
app.use(controller());

let server = app.listen(3000);
// 以下为函数部分↓
function parseUser(obj) {
    if (!obj) {
        return;
    }
    console.log('try parse: ' + obj);

    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }

    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            console.log(`User: ${user.name}, ID: ${user.id}`);
            return user;
        } catch (err) {
            console.log(`error: ${err}`);
        }
    }
}

function createWebSocketServer(server, onConnection, onMessage, onClose, onError) {
    let wss = new WebSocketServer({
        server: server
    });
    // 广播事件
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };

    onConnection = onConnection || function () {
        console.log('[WebSocket] connected.');
    };

    onMessage = onMessage || function (msg) {
        console.log(`[WebSocket] message received: ${msg}`);
    };

    onClose = onClose || function (code, msg) {
        console.log(`[WebSocket] closed: ${code} - ${msg}`);
    };

    onError = onError || function (err) {
        console.log(`[WebSocket] error: ${err}`);
    };

    wss.on('connection', function (ws) {
        let location = url.parse(ws.upgradeReq.url, true);
        console.log(`[WebSocketServer] connection: ${location.href}`);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError);

        if (location.pathname !== '/ws/chat') {
            ws.close(4000, 'Invalid URL');
        }

        let user = parseUser(ws.upgradeReq);
        if (!user) {
            ws.close(4001, 'Invalid user');
        }
        ws.user = user;
        ws.wss = wss;
        onConnection.apply(ws);
    });

    console.log('WebSocketServer was attached.');
    return wss;
}

var messageIndex = 0; // 消息ID

function createMessage(type, user, data) {
    messageIndex ++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}
// 连接事件
function onConnect() {
    let user = this.user;
    let msg = createMessage('join', user, `${username} joined.`);
    this.wss.broadcast(msg);
    // 创建用户列表
    let userlist = this.wss.clients.map(function (client) {
        return client.user;
    });
    this.send(createMessage('list', user, users));
}
// 发消息事件
function onMessage(message) {
    console.log(message);
    if (message && message.trim()) {
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
}
// 关闭事件
function onClose() {
    let user = this.user;
    let msg = createMessage('left', user, `${user.name} is left.`);
    this.wss.broadcast(msg);
}
// 函数部分结束↑

app.wss = createWebSocketServer(server, onConnect, onMessage, onClose);

console.log('app started at port 3000...');