/**
 *  transfer.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Manejador de ejecuciones del Context para Transfer
*/

export function setVehicleType(data) {
    this.setState({ vehicle: data.vehicle, vehicleName: data.vehicleName });
};

export function setLoadingVehicles(data) {
    this.setState({ loadingVehicles: data.loadingVehicles });
};