/**
 *  reservation.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Funciones asyncronas para las peticiones a bases de datos /reservation
*/

// Dependencias
const config = require("../config");
const mysql = require("mysql2/promise");
const email = require("../../email");

/**
 *  @name: reservation_Create_Post
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Crear una reservación de transfer
*/

async function reservation_Create_Post(data) {
	try {
		const storedProcedure = "CALL spWeb_Reservacion_Crear(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		const connection = await new mysql.createPool(config);
        const result = await connection
			.query(storedProcedure, [
                data.idTarifa, data.adultos , data.menores, data.total, data.fechaLlegada, data.fechaSalida, data.horaLlegada, data.horaSalida, data.tipo, data.vehiculo, data.nombre, data.email, data.telefono, data.aerolinea, data.vuelo, data.hotel, data.isArrival
            ])
			.then(result => {
				if (result[0].affectedRows > 0) {
					if (data.tipo === "1" || data.tipo === 1) {
						const options = {
							template: 'roundtrip',
							data: {
								tipo: "Round Trip",
								vehiculo: data.vehiculo === "2" ? "Private Standar" : "Private VIP",
								origen: "Cancún International Airport",
								destino: data.hotel,
								fechaLlegada: data.fechaLlegada,
								horaLlegada: data.horaLlegada,
								fechaSalida: data.fechaSalida,
								horaSalida: data.horaSalida,
								vuelo: data.vuelo,
								aerolinea: data.aerolinea,
								nombre: data.nombre,
								adultos: data.adultos,
								menores: data.menores,
								total: data.total,
								llegada: data.isArrival ? "Pending, upon arrival" : "Yes"
							}
						}
						email.prepareEmail(options, 'Reservation confirmation - Best Line Cancún', data.email);
					} else {
						if (data.tipo === "2" || data.tipo === 2) {
							const options = {
								template: 'airhot',
								data: {
									tipo: "Airport to Hotel",
									vehiculo: data.vehiculo === "1" ? "Collective Standar" : data.vehiculo === "2" ? "Private Standar" : "Private VIP",
									origen: "Cancún International Airport",
									destino: data.hotel,
									fechaLlegada: data.fechaLlegada,
									horaLlegada: data.horaLlegada,
									vuelo: data.vuelo,
									aerolinea: data.aerolinea,
									nombre: data.nombre,
									adultos: data.adultos,
									menores: data.menores,
									total: data.total,
									llegada: data.isArrival ? "Pending, upon arrival" : "Yes"
								}
							}
							email.prepareEmail(options, 'Reservation confirmation - Best Line Cancún', data.email);
						} else {
							const options = {
								template: 'hotair',
								data: {
									tipo: "Hotel to Airport",
									vehiculo: data.vehiculo === "1" ? "Collective Standar" : data.vehiculo === "2" ? "Private Standar" : "Private VIP",
									origen: data.hotel,
									destino: "Cancún International Airport",
									fechaSalida: data.fechaSalida,
									horaSalida: data.horaSalida,
									vuelo: data.vuelo,
									aerolinea: data.aerolinea,
									nombre: data.nombre,
									adultos: data.adultos,
									menores: data.menores,
									total: data.total,
									llegada: data.isArrival ? "Pending, upon arrival" : "Yes"
								}
							}
							email.prepareEmail(options, 'Reservation confirmation - Best Line Cancún', data.email);
						}
					}
					return { created: true }
				} else {
					return {
						created: false,
						message: "NO FUE POSIBLE CREAR LA RESERVACIÓN"
					};
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { error: true, message: error, status: 400 };
	}
}

/**
 *  @name: reservation_Special_Post
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Crear una reservación especial
*/

async function reservation_Special_Post(data) {
	try {
		if (data.selectedType === "1" || data.selectedType === 1) {
			const options = {
				template: 'roundtripspecial',
				data: {
					tipo: "Round Trip",
					origen: "Cancún International Airport",
					destino: data.hotelName,
					fechaLlegada: data.arrivalDate,
					fechaSalida: data.depatureDate,
					nombre: data.fullName,
					adultos: data.adults,
					menores: data.childrens					
				}
			}
			email.prepareEmail(options, 'Special request - Best Line Cancún', data.email);
		} else {
			if (data.selectedType === "2" || data.selectedType === 2) {
				const options = {
					template: 'airhotspecial',
					data: {
						tipo: "Airport to Hotel",
						origen: "Cancún International Airport",
						destino: data.hotelName,
						fechaLlegada: data.arrivalDate,
						nombre: data.fullName,
						adultos: data.adults,
						menores: data.childrens	
					}
				}
				email.prepareEmail(options, 'Special request - Best Line Cancún', data.email);
			} else {
				const options = {
					template: 'hotairspecial',
					data: {
						tipo: "Hotel to Airport",
						origen: data.hotelName,
						destino: "Cancún International Airport",
						fechaSalida: data.depatureDate,
						nombre: data.fullName,
						adultos: data.adults,
						menores: data.childrens	
					}
				}
				email.prepareEmail(options, 'Special request - Best Line Cancún', data.email);
			}
		}
		return { send: true }
	} catch (error) {
		return { error: true, message: error, status: 400 };
	}
}

/**
 *  @name: reservation_getAll
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Obtener todas las reservaciones
*/

async function reservation_getAll() {
	try {
		const query = "SELECT rsv.id_reservacion AS idReservacion, rsv.adultos, rsv.menores, rsv.total, tvj.nombre AS tipo, rsv.estado, rsv.hotel, rsv.llegada FROM reservacion AS rsv JOIN tipo_viaje AS tvj ON rsv.tipo_viaje = tvj.id_tipo_viaje JOIN vehiculo AS vhc ON rsv.vehiculo = vhc.id_vehiculo ORDER BY id_reservacion DESC";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query)
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { 
							reservations: recordSet 
						};
					} else {
						return { error: { message: "SIN HOTELES" }};
					}
				} else {
					return { error: { message: "ERROR DE COMUNICACIÓN EN TODOS LOS HOTELES" } };
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { error: { message: error } };
	}
}

/**
 *  @name: reservation_getById
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Obtener una reservación por el ID
*/

async function reservation_getById(id) {
	try {
		const query = "SELECT rsv.id_reservacion AS idReservacion, rsv.adultos, rsv.menores, rsv.total, rsv.fecha_llegada AS FechaLlegada, rsv.fecha_salida AS fechaSalida, rsv.hora_llegada AS horaLlegada, rsv.hora_salida AS horaSalida, tvj.nombre AS tipo, vhc.nombre AS vehiculo, rsv.nombre_pasajero_principal AS pasajero, rsv.email, rsv.telefono, rsv.aerolinea, rsv.numero_vuelo AS numeroVuelo, rsv.estado, rsv.hotel, rsv.llegada FROM reservacion AS rsv JOIN tipo_viaje AS tvj ON rsv.tipo_viaje = tvj.id_tipo_viaje JOIN vehiculo AS vhc ON rsv.vehiculo = vhc.id_vehiculo WHERE rsv.id_reservacion = ? ORDER BY id_reservacion DESC";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [id])
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { 
							reservation: recordSet[0]
						};
					} else {
						return { error: { message: "No existe la resevación" } };
					}
				} else {
					return { error: { message: "Error de comunicación con la base de datos" } };
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { error: { message: error } };
	}
}

/**
 * @function: reservationFinish_Patch
 * @param: data: Object
 * @description: Función para finalizar la reservación
*/
async function reservationFinish_Patch(id) {
	try { 
		const query = "UPDATE reservacion SET estado = 2 WHERE id_reservacion = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [id])
			.then(result => {
				if (result[0].affectedRows > 0) {
					return { updated: true }
				} else {
					return {
						error: {
							message: "No fue posible actualizar al usuario"
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
	reservation_Create_Post,
	reservation_Special_Post,
	reservation_getAll,
	reservation_getById,
	reservationFinish_Patch
};