// 引入
const Koa = require('koa')
const Router = require('koa-router')
// const router = require('koa-router')() // 引入同时实例化

// 实例化
const app = new Koa()
const router = new Router()

// 应用级中间件,每个访问都输出当前时间，app.use无论代码在哪，都在路由匹配前执行
app.use(async (ctx, next) => {
    console.log(new Date())
    // ctx.body = '这是一个中间件'
    await next() // 继续向下运行
    if (ctx.status === 404) {
        ctx.body = '这是个404页面'
    }
})

// 配置路由
router.get('/', async (ctx) => {
    ctx.body = '这是首页'
})
router.get('/news', async (ctx) => {
    console.log('这是一个新闻')
    // 获取get传值
    console.log(ctx.query)
    console.log(ctx.querystring)
    console.log(ctx.request.url)
    ctx.body = '这是新闻页'
})
// 动态路由,可以多层嵌套
router.get('/newscontent/:id/:cid', async (ctx) => {
    console.log(ctx.params)
    ctx.body = `这是新闻${ctx.params.id}-${ctx.params.cid}内容页`
})

// 启动路由
app.use(router.routes())
// 根据ctx.status配置response的响应头
app.use(router.allowedMethods())

// 端口监听
app.listen(3000)