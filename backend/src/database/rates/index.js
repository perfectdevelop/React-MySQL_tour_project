/**
 *  rates.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Funciones asyncronas para las peticiones a bases de datos /rates
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

async function rates_Price_Post(data) {
	try {
        const query = 'SELECT id_tarifa AS idTarifa, precio, directo FROM tarifario WHERE origen = ? AND destino = ? AND tipo_viaje = ? AND vehiculo = ? AND min = ? AND max = ?';
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [data.origen, data.destino, data.tipo, data.vehiculo, data.min, data.max])
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { rate: recordSet[0] };
					} else {
						return { empty: true, message: "NO EXISTE UNA TARIFA APROPIADA" };
					}
				} else {
					return { error: true, message: "ERROR DE COMUNICACIÓN OBTENIENDO LAS TARIFAS" };
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { error: true, message: error };
	}
}

// Exportar todas las funciones
module.exports = {
    rates_Price_Post    
};