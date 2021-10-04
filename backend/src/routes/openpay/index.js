/**
 *  openpay.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Rutas y métodos para /pay
*/

const koaRouter = require('koa-router');
const koaBody = require('koa-body');
const route = new koaRouter({ prefix: '/pay' });
const database = require('../../database/reservation');
const OpenPay = require('openpay');
const openpay = new OpenPay('msh412cb3pgh3ranxeoc','sk_5906f671ed394d1f87611aa856ebd4c9', false);

route.post('/transfer', koaBody(), async function(context){
    try {
        const data = context.request.body;
        let chargeRequest = {
            'source_id': data.source_id,
            'method': 'card',
            'amount': data.amount,
            'currency': 'USD',
            'description': 'Best Line Cancún Transfer Purchase',
            'device_session_id': data.device_session_id,            
            'customer': {
                'name': data.name,
                'phone_number': data.telephone,
                'email': data.email
            },
            redirect_url: 'https://bestlinecancun-api.herokuapp.com/pay/transfer/status'
        };
        context.body = await new Promise(response => {
            openpay.charges.create(chargeRequest, async (error, body) => {
                if (error) {
                    console.log("OpenPay error: ", error);
                    response({ message: error.description });
                } else {
                    if (body.status === "completed") {
                        console.log("OpenPay: ", body);
                        const created = await database.reservation_Create_Post(data);
                        if (created) {
                            response({ payed: true, message: 'Reservación realizada', created: true });
                        } else {
                            response({ payed: true, message: 'Ocurrió un error al generar la reservación, contacta a soporte', created: false });
                        }
                    } else {
                        response({ payed: false, message: body.error_message });
                    }
                }
            });
        });
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = route;