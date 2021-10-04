/**
 *  reservation.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Rutas y métodos para /reservation
*/

// Dependencias
const koaRouter = require('koa-router');
const koaBody = require('koa-body');
const route = new koaRouter({ prefix: '/tours' });
const database = require('../../database/tours');



// Crear una reservación de transfer
route.get('/gettours', koaBody(), async (context) => {
    try {
        context.body = await database.tours_All_Get();
    } catch (error) {
        console.log(error)
        context.body = { error: true, message: error };
    }
});

// module.exports = route;

/**
 *  hotels.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Rutas y métodos para /hotels
*/

// Dependencias
// const koaRouter = require('koa-router');
// const koaBody = require('koa-body');
// const route = new koaRouter({ prefix: '/tours' });
// const database = require('../../database/tours');

// Obtener todos lo Hoteles
route.get('/all', koaBody(), async (context) => {
    try {
        context.body = await database.hotels_All_Get();
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

// Obtener información del Hotel
route.get('/:id', koaBody(), async (context) => {
    try {
        const idHotel = context.params.id;
        context.body = await database.hotel_Get(idHotel);
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

route.post('/gettoursAllAdmin', koaBody(), async (context) => {
    try {
        context.body = await database.tours_All_Get();
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

route.post('/getAdminTours', koaBody(), async (context) => {
    try {
        const id = context.request.body;
        context.body = await database.tours_Admin_Get(parseInt(id));
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

// route.post('/getAdminHotelZone', koaBody(), async (context) => {
//     try {
//         context.body = await database.hotelZone_Admin_Get();
//     } catch (error) {
//         console.log(error);
//         context.body = { error: true, message: error };
//     }
// });

route.patch('/update', koaBody(), async (context) => {
    try {
        const data = context.request.body;
        context.body = await database.tours_Admin_Update(data);
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

route.post('/delete', koaBody(), async (context) => {
    try {
        const data = context.request.body;
        context.body = await database.tours_Admin_Delete(data);
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

route.post('/add', koaBody(), async (context) => {
    try {
        const data = context.request.body;
        context.body = await database.tours_Admin_Insert(data);
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

module.exports = route;