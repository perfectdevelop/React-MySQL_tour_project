/**
 *  reservation.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Funciones asyncronas para las peticiones a bases de datos /reservation
*/

// Dependencias
const config = require("../config");
const mysql = require("mysql2/promise");
const token = require("../../auth/token");

/**
 * @function: usuariosLogin_Post
 * @param: data: Object
 * @version: 2
 * @description: Función para realizar login y devolver datos cifrados.
*/
async function usuariosLogin_Post(data) {
	try {
		const query = "SELECT id AS idUsuario, correo, nombre FROM usuario WHERE correo = ? AND password = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [data.email, data.password])
			.then(async ([rows]) => {
				const recordSet = rows[0];
				if (recordSet) {
					return { 
						user: token.getToken(JSON.stringify(recordSet)),
						name: recordSet.nombre 
					};
				} else {
					return {
						error: { message: "LOS DATOS NO SON CORRECTOS" }
					};
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { 
			error: { message: error.message } 
		};
	}
}

// Exportar todas las funciones
module.exports = {
    usuariosLogin_Post
};