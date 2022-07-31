const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
    // 由async标记的函数称为异步函数
    await next();
    // 设置response的Content-Type
    ctx.response.type = 'text/html';
    // 设置response的内容
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

app.listen(3000);
console.log('app started at port 3000...');