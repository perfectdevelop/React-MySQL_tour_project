/**
 *  default.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Rutas y métodos para /
*/

const koaRouter = require("koa-router");
const router = new koaRouter();

router.get("/", async function (context) {
    context.body = "Best Line Cancún API";
});

module.exports = router;
