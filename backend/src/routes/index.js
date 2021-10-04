/**
 *  index.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Incorporación de todas las rutas de la aplicación
*/

// Importar todas las rutas
const auth = require("../auth");
const index = require("./default");
const hotels = require("./hotels");
const rates = require("./rates");
const reservation = require("./reservation");
const payments = require("./openpay");
const users = require("./users");
const zones = require("./zones");
const tours = require("./tours");

module.exports = {
    routes: [
        tours.routes(),
        auth.routes(),
        index.routes(),
        hotels.routes(),
        rates.routes(),
        reservation.routes(),
        payments.routes(),
        users.routes(),
        zones.routes()
    ]
};
