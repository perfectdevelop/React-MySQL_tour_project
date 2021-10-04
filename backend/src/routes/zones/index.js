/**
 *  zones.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Rutas y métodos para /zones
*/

// Dependencias
const koaRouter = require('koa-router');
const koaBody = require('koa-body');
const route = new koaRouter({ prefix: '/zones' });
const database = require('../../database/zones');


route.post('/getAdminZones', koaBody(), async (context) => {
    try {
        context.body = await database.Zones_Admin_Get();
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

route.post('/getAdminZonesHotels', koaBody(), async (context) => {
    try {
        const id = context.request.body;
        context.body = await database.hotelZones_Admin_Get(parseInt(id));
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

route.post('/getAdminRates', koaBody(), async (context) => {
    try {
        const id = context.request.body;
        context.body = await database.hotelZones_Admin_Get(parseInt(id));
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

route.post('/zonesPrice_Admin_Get', koaBody(), async (context) => {
    try {
        const id = context.request.body;
        context.body = await database.zonesPrices_Admin_Get(parseInt(id));
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

route.patch('/zonesPrice_Admin_Update', koaBody(), async (context) => {
    try {
        const data = context.request.body;
        context.body = await database.zonesPrices_Admin_Update(data);
    } catch (error) {
        console.log(error);
        context.body = { error: true, message: error };
    }
});

// route.post('/zonesPrice_Admin_Insert', koaBody(), async (context) => {
//     try {
//         const data = context.request.body;
//         context.body = await database.zonesPrices_Admin_Create(data);
//     } catch (error) {
//         console.log(error);
//         context.body = { error: true, message: error };
//     }
// });

module.exports = route;