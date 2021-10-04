/**
 *  config.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Configuración del MiddleWare para conexiones a Base de datos
*/

const { encodeXText } = require("nodemailer/lib/shared");


// const config = {
//     host: "72.29.120.13",
//     port: "3306",
//     database: "inmobi85_bestlinecancun",
//     user: "inmobi85_blcadmn",
//     password: "b3s1l1n3C@ncun#_",
//     multipleStatements: true
// };

const config = {
    host: "localhost",
    port: "3306",
    database: "bestlinecancun",
    user: "root",
    password: "",
    multipleStatements: true
};

module.exports = config;



