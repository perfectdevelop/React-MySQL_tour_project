/**
 *  transporter.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Configuración del Transporter de correo
*/

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "mail.bestlinecancun.com",
    port: 465,
    secure: true,
    auth: {
        user: "emails@bestlinecancun.com",
        pass: "+#qU&qyT7+%O"
    },
    tls: {
		rejectUnauthorized: false
	}
});

module.exports = transporter;