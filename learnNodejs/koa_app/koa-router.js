const Koa = require('koa');
// require('koa-router')返回的是函数
const router = require('koa-router')();

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
// 处理不同的URL
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});
// add router middleware
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');