// 引入
const Koa = require('koa')
const Router = require('koa-router')
// const router = require('koa-router')() // 引入同时实例化

// 实例化
const app = new Koa()
const router = new Router()

// 配置路由
router.get('/', async (ctx) => {
    ctx.body = '这是首页'
})
router.get('/news', async (ctx) => {
    // 获取get传值
    console.log(ctx.query)
    console.log(ctx.querystring)
    console.log(ctx.request.url)
    ctx.body = '这是新闻页'
})

// 启动路由
app.use(router.routes())
// 根据ctx.status配置response的响应头
app.use(router.allowedMethods())

// 端口监听
app.listen(3000)