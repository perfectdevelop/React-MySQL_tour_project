/**
 *  hotels.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Manejador de ejecuciones del Context para Hoteles
*/

export function setHotel(data) {
    this.setState({ idHotel: data.idHotel, idZoneHotel: data.idZoneHotel, hotelName: data.hotelName });
};