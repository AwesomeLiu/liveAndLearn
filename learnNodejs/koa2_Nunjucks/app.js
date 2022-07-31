const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');

const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';
// 第一个middleware 记录URL以及页面执行时间
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var start = new Date().getTime();
    var execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Reponse-Time', `${execTime} ms`);
});
// 第二个middleware 处理静态文件
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}
// 第三个middleware 解析POST请求
app.use(bodyParser());
// 第四个middleware 给ctx加上render()来使用Nunjucks
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));
// 最后一个middleware 处理URL路由
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');