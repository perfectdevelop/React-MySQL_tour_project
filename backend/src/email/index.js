/**
 *  email.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Función para enviar emails
*/

const transporter = require('./transporter');
const fs = require("fs");

async function useLayout(path, data) {
    let template = await new Promise((resolve, reject) => { 
        fs.readFile(`./src/email/templates/${path}.html`, "utf8",
            (error, data) => {
                return error ? reject(error) : resolve(data);
            }
        )
    });
  
    if (data) {
        Object.keys(data).forEach(function (key) {
            const find = new RegExp(`<%${key}%>`, 'g');
            template = template.replace(find, data[key]);
        });
    }
    return template;
}

async function prepareEmail(options, subject, customerEmail) {
    const htmlTemplate = await useLayout(options.template, options.data);
    const mailOptions = {
        from: "Best Line Cancun <emails@bestlinecancun.com>",
        to: customerEmail,
        cc: "reservaciones@bestlinecancun.com",
        subject: subject,
        html: htmlTemplate
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
}

module.exports = { prepareEmail };