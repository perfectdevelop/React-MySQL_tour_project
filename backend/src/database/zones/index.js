/**
 *  zones.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Funciones asyncronas para las peticiones a bases de datos /zones
*/

// Dependencias
const config = require("../config");
const mysql = require("mysql2/promise");

/**
 *  @name: Zones_Admin_Get
 *  @description: Obtener todas las zonas
*/
async function Zones_Admin_Get() {
	try {
		const query = "SELECT id_zona AS idZona, zona, nombre FROM zona WHERE id_zona > 1 ORDER BY id_zona";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query)
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { zones: recordSet };
					} else {
						return { error: { message: "No existen zonas" } };
					}
				} else {
					return { error: { message: "Error de comunicación con la base de datos" } };
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { error: true, message: error };
	}
}

/**
 *  @name: hotelZones_Admin_Get
 *  @description: Obtener todas los hoteles de una zona
*/
async function hotelZones_Admin_Get(id) {
	try {
		const query = "SELECT hotel.nombre FROM hotel JOIN zona ON hotel.id_zona = zona.id_zona WHERE zona.id_zona = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [id])
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { hotels: recordSet };
					} else {
						return { error: { message: "No existen hoteles en la zona" } };
					}
				} else {
					return { error: { message: "Error de comunicación con la base de datos" } };
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { error: true, message: error };
	}
}

/**
 *  @name: zonesPrices_Admin_Get
 *  @description: Obtener el tarifario completo de una zona
*/
async function zonesPrices_Admin_Get(id) {
	try {
        const query = 'CALL spWeb_Tarifario_Select(?)';
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [id])
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { rates: recordSet[0] };
					} else {
						return { erro: { message: "NO EXISTE UNA TARIFA APROPIADA"} };
					}
				} else {
					return { error: { message: "ERROR DE COMUNICACIÓN OBTENIENDO LAS TARIFAS"} };
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { error: { message: error }};
	}
}

/**
 * @function: zonesPrices_Admin_Update
 * @param: data: Object
 * @description: Función para actualizar el tarifario
*/
async function zonesPrices_Admin_Update(data) {
	let counter = 0;
	try {
		if (data.collective) {
			await data.idTarifas.reduce(async (promise, idTarifa, index) => {
				const query = "UPDATE tarifario SET precio = ? WHERE id_tarifa = ?";
				const connection = mysql.createPool(config);
				await connection.query(query, [data.tarifas[index], idTarifa])
				.then(rows => {
					if (rows[0].affectedRows > 0) {
						counter++;
					} else {
						console.log("No fue posible actualizar la tarifa: ", idTarifa);
					}
				}).catch(error => {
					console.log(error);
				});
				await promise;
			}, Promise.resolve());
			if (counter >= 20) {
				return { updated: true }
			} else {
				return { error: { message: "Algunas tarifas no fueron actualizadas" } }
			}
		} else {
			await data.idTarifas.reduce(async (promise, idTarifa, index) => {
				if (idTarifa !== null) {
					const query = "UPDATE tarifario SET precio = ? WHERE id_tarifa = ?";
					const connection = mysql.createPool(config);
					await connection.query(query, [data.tarifas[index], idTarifa])
					.then(rows => {
						if (rows[0].affectedRows > 0) {
							counter++;
						} else {
							console.log("No fue posible actualizar la tarifa: ", idTarifa);
						}
					}).catch(error => {
						console.log(error);
					});
				}
				await promise;
			}, Promise.resolve());
			if (counter >= 18) {
				return { updated: true }
			} else {
				return { error: { message: "Algunas tarifas no fueron actualizadas" } }
			}
		}
	} catch (error) {
		return { 
			error : error.message
		};
	}
}

/**
 * @function: zonesPrices_Admin_Create
 * @param: data: Object
 * @description: Función para crear una zona con tarifario
async function zonesPrices_Admin_Create(data) {
	let counter = 0, idZona = 0;
	try {
		if (data.allowCollective) {
			const storedProcedure = "CALL spWeb_Zona_Crear(?)";
			const connection = mysql.createPool(config);
			await connection.query(storedProcedure, [data.name])
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						idZona = recordSet[0].idZona;
					} else {
						return { error: { message: "No fue posible crear la zona" } };
					}
				} else {
					return { error: { message: "Error de comunicación con la base de datos" } };
				}
			}).catch(error => {
				console.log(error);
			});

			if (idZona > 0) {

				const query = "INSERT INTO tarifario(origen, destino, tipo_viaje, vehiculo, min, max, precio) VALUES(?,?,?,?,?,?,?)";
				const connection = mysql.createPool(config);
				await connection.query(query, [1, idZona, 2, 1, 0, 0, data.privadoAH1])
				.then(rows => {
					if (rows[0].affectedRows > 0) {
						counter++;
					} else {
						console.log("No fue posible crear la tarifa");
					}
				}).catch(error => {
					console.log(error);
				});

				

			} else {
				return { error: { message: "No existe la zona" } }
			}

		} else {
		}
	} catch (error) {
		return { 
			error : error.message
		};
	}
} */

// Exportar todas las funciones
module.exports = {
    Zones_Admin_Get,
    hotelZones_Admin_Get,
	zonesPrices_Admin_Get,
	zonesPrices_Admin_Update	
};