/**
 *  reservation.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Rutas y métodos para /reservation
*/

// Dependencias
const koaRouter = require('koa-router');
const koaBody = require('koa-body');
const route = new koaRouter({ prefix: '/reservation' });
const database = require('../../database/reservation');

// Crear una reservación de transfer
route.post('/create', koaBody(), async (context) => {
    try {
        const data = context.request.body;
        context.body = await database.reservation_Create_Post(data);
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

route.post('/special', koaBody(), async (context) => {
    try {
        const data = context.request.body;
        context.body = await database.reservation_Special_Post(data);
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

route.post('/getAll', koaBody(), async (context) => {
    try {
        context.body = await database.reservation_getAll();
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

route.post('/get/id', koaBody(), async (context) => {
    try {
        const id = context.request.body;
        context.body = await database.reservation_getById(parseInt(id));
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

route.patch('/finish/id', koaBody(), async (context) => {
    try {
        const id = context.request.body;
        context.body = await database.reservationFinish_Patch(parseInt(id));
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

module.exports = route;