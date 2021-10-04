/**
 *  hotel.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Funciones asyncronas para las peticiones a bases de datos /hotels
*/

// Dependencias
const config = require("../config");
const mysql = require("mysql2/promise");

/**
 *  @name: hotels_All_Get
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Obtener el id, zona y nombre de todos los hoteles
*/

async function hotels_All_Get() {
	try {
		const query = "SELECT id_hotel AS value, nombre AS label FROM hotel ORDER BY id_zona";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query)
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { hotels: recordSet };
					} else {
						return { empty: true, message: "SIN HOTELES" };
					}
				} else {
					return { error: true, message: "ERROR DE COMUNICACIÓN EN TODOS LOS HOTELES" };
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { error: true, message: error };
	}
}

/**
 *  @name: hotels_All_Get
 *  @version: 1.0.0
 *  @author: trejocode
 * @param: idHotel: int
 *  @description: Obtener el id, zona y nombre de todos los hoteles
*/

async function hotel_Get(idHotel) {
	try {
		const query = `
			SELECT 
				htl.id_hotel AS idHotel, zna.id_zona AS idZona, htl.nombre 
			FROM 
				hotel AS htl INNER JOIN zona AS zna 
				ON htl.id_zona = zna.id_zona
			WHERE 
				id_hotel = ?`;
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [idHotel])
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { hotel: recordSet[0] };
					} else {
						return { empty: true, message: "SIN HOTELES" };
					}
				} else {
					return { error: true, message: "ERROR DE COMUNICACIÓN EN TODOS LOS HOTELES" };
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { error: true, message: error };
	}
}

/**
 *  @name: hotels_All_Admin_Get
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Obtener el id, zona y nombre de todos los hoteles
*/

async function hotels_All_Admin_Get() {
	try {
		const query = "SELECT hotel.id_hotel AS idHotel, hotel.nombre, zona.id_zona AS idZona, zona.zona FROM hotel JOIN zona ON hotel.id_zona = zona.id_zona ORDER BY zona.id_zona";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query)
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { 
							hotels: recordSet
						};
					} else {
						return { error: { message: "No existen hoteles" } };
					}
				} else {
					return { error: { message: "Error de comunicación con la base de datos" } };
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { error: { message: error.message }};
	}
}

/**
 *  @name: hotel_Admin_Get
 *  @version: 1.0.0
 *  @author: trejocode
 * @param: idHotel: int
 *  @description: Obtener la información de un Hotel
*/

async function hotel_Admin_Get(idHotel) {
	try {
		const query = `SELECT hotel.id_hotel AS idHotel, hotel.nombre, zona.id_zona AS idZona, zona.zona FROM hotel JOIN zona ON hotel.id_zona = zona.id_zona WHERE hotel.id_hotel =  ?`;
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [idHotel])
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { hotel: recordSet[0] };
					} else {
						return { error: { message: "No existe el hotel" } };
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
 *  @name: hotelZone_Admin_Get
 *  @version: 1.0.0
 *  @author: trejocode
 * @param: idHotel: int
 *  @description: Obtener todas las zonas de hoteles
*/

async function hotelZone_Admin_Get() {
	try {
		const query = "SELECT id_zona AS idZona, zona FROM zona";
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
 * @function: hotel_Admin_Update
 * @param: data: Object
 * @description: Función actualizar un Hotel
*/
async function hotel_Admin_Update(data) {
	try { 
		const query = "UPDATE hotel SET id_zona = ?, nombre = ? WHERE id_hotel = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [data.idZona, data.nombre, data.idHotel])
			.then(result => {
				if (result[0].affectedRows > 0) {
					return { updated: true }
				} else {
					return {
						error: {
							message: "No fue posible actualizar al el hotel"
						}
					};
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { error: { message: error.message }};
	}
}

/**
 * @function: hotel_Admin_Delete
 * @param: data: Object
 * @description: Función eliminar un Hotel
*/
async function hotel_Admin_Delete(data) {
	try { 
		const query = "DELETE FROM hotel WHERE id_hotel = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [data.idHotel])
			.then(result => {
				if (result[0].affectedRows > 0) {
					return { updated: true }
				} else {
					return {
						error: {
							message: "No fue posible eliminar el hotel"
						}
					};
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { error: { message: error.message }};
	}
}

/**
 * @function: hotel_Admin_Insert
 * @param: data: Object
 * @description: Función para insertar un Hotel
*/
async function hotel_Admin_Insert(data) {
	try { 
		console.log(data);
		const query = "INSERT INTO hotel VALUES(?,?,?)";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [null, data.idZona, data.nombre])
			.then(result => {
				if (result[0].affectedRows > 0) {
					return { updated: true }
				} else {
					return {
						error: {
							message: "No fue insertar el hotel"
						}
					};
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { error: { message: error.message }};
	}
}

// Exportar todas las funciones
module.exports = {
    hotels_All_Get,
	hotel_Get,
	hotels_All_Admin_Get,
	hotel_Admin_Get,
	hotelZone_Admin_Get,
	hotel_Admin_Update,
	hotel_Admin_Insert,
	hotel_Admin_Delete
};