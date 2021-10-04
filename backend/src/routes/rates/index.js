/**
 *  ratess.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Rutas y métodos para /rates
*/

// Dependencias
const koaRouter = require('koa-router');
const koaBody = require('koa-body');
const route = new koaRouter({ prefix: '/rates' });
const database = require('../../database/rates');

// Obtener la tarifa de la reservación
route.post('/price', koaBody(), async (context) => {
    try {
        const data = context.request.body;
        context.body = await database.rates_Price_Post(data);
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

module.exports = route;