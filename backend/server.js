/**
 *  server.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Punto de entrada de la aplicación
 * 	@process: 1
*/

const http = require("http");
const koa = require("koa");
// const cors = require("koa2-cors");
const cors = require('@koa/cors');
const key = require('./src/auth/variables');
const app = new koa();

// Cross - Origin Resource Sharing(CORS)
app.use(
    cors({
        origin: () => {
            if (process.env.NODE_ENV !== "production") {
                return "*";
            }
            return "*";
        }
    })
);
// var options = {
//     origin: '*'
// };
// app.use(cors(options));

// app.use(cors())
// app.use(async (context, next) => {
   
//     const { getDecode } = require('./src/auth/token');

//     function validateToken() {
//         try {
//             const path = context.path;
//             if (path.indexOf('auth') > 0) {
//                 return true;
//             }
//             let auth = getDecode(context.headers.best_line_cancun_key);
//             console.log('Authorized!=================>:',auth)
//             if (auth) {
//                 return true;
//                 // if (auth === process.env.IDAPP) {
//                 //     console.log('OK')
//                 //     return true;
//                 // } else {
//                 //     return false;
//                 // }
//             }
//             return false;
//         } catch(error) {
//             console.error(error.message);
//             return false;
//         }
//     }

//     if (validateToken()) {
        
//         context.set('Access-Control-Allow-Origin', '*');
//         context.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
//         await next();
//     } else {
//         context.status = 403;
//     }

//     const responseTime = context.response.get("X-Response-Time");
//     console.log(`🔚 METHOD: ${context.method} ${context.url}  -  TIME: ${responseTime}  -  STATUS: ${context.status}` );

// });

/**
 * 	Calculo del Header "X-Response-Time"
 * 	Computar y asignar el Header "X-Response-Time" el calculo en 'ms' de peticiones
 */

app.use(async (context, next) => {
    const startTime = Date.now();
    await next();
    const ms = Date.now() - startTime;
    context.set("X-Response-Time", `${ms}ms`);
});


// Gestión de las rutas válidas de la aplicación

const { routes } = require("./src/routes");
routes.map(route => {
    app.use(route);
});

// 	Variables de entorno / 	HOST: String, PORT: Int

const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 8081;

const server = http.createServer(app.callback());

/**
 * 	Ejecución del servidor.
 * 	Activa el evento "Listener" este método es llamado cuando un evento ocurre.
 */

server.listen(PORT, () => {
    console.log("Application in execution:", `${HOST}:${PORT} 🔥`);
});