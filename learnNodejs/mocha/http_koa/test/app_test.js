const request = require('supertest');
const app = require('../app');

describe('#test koa app', () => {
    // 监听9900端口，并获得返回的server实例
    let server = app.listen(9900);

    describe('#test server', () => {
        it('#test GET /', async () => {
            // 构造一个GET请求，发送给koa的应用，然后获得响应
            // 使用supertest提供的 expect() 更方便地断言响应的HTTP代码、返回的内容和HTTP头
            // 断言HTTP头时可使用正则表达式
            // 如下可以成功匹配到Content-Type为[text/html] [text/html; charset=utf-8]等值
            let res = await request(server)
                            .get('/')
                            .expect('Content-Type', /text\/html/)
                            .expect(200, '<h1>Hello, world!</h1>');
        });

        it('#test GET /path?name=Bob', async () => {
            let res = await request(server)
                            .get('/path?name=Bob')
                            .expect('Content-Type', /text\/html/)
                            .expect(200, '<h1>Hello, Bob!</h1>');
        });
        
        // 当所有测试运行结束后，app实例会自动关闭，无须清理
    });
});