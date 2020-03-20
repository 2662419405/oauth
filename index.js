const Koa = require("koa");
const router = require("koa-router")();
const app = new Koa();

router.use("/server/oauth", require("./oauth.js"));

// 加载所有路由
app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());

app.listen(10010, () => {
  console.log(`服务器运行在10010端口上`);
});
