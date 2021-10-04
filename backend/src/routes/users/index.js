/**
 *  users.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @version: 2
 *  @description: Rutas y métodos para /users
*/

// Dependencias
const koaRouter = require('koa-router');
const koaBody = require('koa-body');
const database = require('../../database/users');
const token = require('../../auth/token');

const route = new koaRouter({ 
    prefix: '/users' 
});

route.post('/login', koaBody(), async (context) => {
    try {
        let data = context.request.body;
        data = { ...data, password: token.getToken(data.password) };
        context.body = await database.usuariosLogin_Post(data);
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

route.post("/token", koaBody(), async (context) => {
	try {
		const data = context.request.body;
		const result = token.getDecode(data.user);
		context.body = { data: result };
	} catch (error) {
		console.log(error.message);
		context.body = { error: true, message: "Error de token" };
	}
});

module.exports = route;