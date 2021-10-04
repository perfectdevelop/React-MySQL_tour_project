/**
 *  @name: reservations.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Página de /reservaciones 
*/

import React, { Component } from 'react';
import { Consumer } from '../context';
import Layout from '../pages/layout';
import Modal from '../components/modals/modal';
import cogoToast from 'cogo-toast';

// HTTP Client
import Request from '../utils/http';
const request = new Request();

class PageReservations extends Component {

    state = {
        user: null, reservations: [], isOpen: false, reservation: [], allReservations: [], finished: false, query: ''
    }

    render() {
        const { reservations } = this.state;
        return(
            <Layout title = "Reservaciones">
                <div className="reservations justify-center">
                    <div className="container column">
                        <div className="white-space-32"></div>
                        <div className="table column">
                            <div className="options row-responsive align-center">
                                <h4 className="color-darkgray">
                                    RESERVACIONES
                                </h4>
                                <div className="row-responsive">
                                    <div className="input-container">
                                        <input type="text" className="input" placeholder="Buscar por ID"
                                        onChange = { this.handleSearch.bind(this) } value = { this.state.query } />
                                    </div>
                                    <div className="input-container auto align-center">
                                        <label className="checkbox-container">
                                            Mostrar finalizados
                                            <input type="checkbox" name="finished" 
                                            onChange = { this.showFinished.bind(this) } />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="white-space-16"></div>
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Pasajeros</th>
                                            <th>Tipo</th>
                                            <th>Total</th>
                                            <th>Estado</th>
                                            <th>Detalles</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            reservations.map( reservation => (
                                                <tr key = { reservation.idReservacion }>
                                                    <td> { reservation.idReservacion } </td>
                                                    <td> { (reservation.adultos + reservation.menores) } </td>
                                                    <td className="tipo"> { reservation.tipo } </td>
                                                    <td> ${ reservation.total } </td>
                                                    <td className="estado weigth-medium"> 
                                                        { reservation.estado === 1 ? "Reservado" : reservation.estado === 2 ? "Finalizado" : "Pendiente" }
                                                    </td>
                                                    <td className="button">
                                                        <button className="btn btn-primary btn-radius" onClick = { this.getReservation.bind(this, reservation.idReservacion) } >
                                                            Ver más
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="white-space-32"></div>
                        <Modal isOpen = { this.state.isOpen } title = "DETALLE DE RESERVACIÓN">
                            <div className="column full">
                                <h3 className="color-darkgray">
                                    Datos personales
                                </h3>
                                <div className="white-space-8"></div>
                                <div className="personal">
                                    <p className="color-darkgray">
                                        <span className="weight-semi">Nombre:</span> { this.state.reservation.pasajero }
                                    </p>
                                    <div className="white-space-4"></div>
                                    <p className="color-darkgray">
                                        <span className="weight-semi">Teléfono:</span> { this.state.reservation.telefono }
                                    </p>
                                    <div className="white-space-4"></div>
                                    <p className="color-darkgray">
                                        <span className="weight-semi">Correo:</span> { this.state.reservation.email }
                                    </p>
                                </div>
                                <div className="white-space-24"></div>
                                <hr/>
                                <div className="white-space-24"></div>
                                <h3 className="color-darkgray">
                                    Datos de reservación
                                </h3>
                                <div className="white-space-8"></div>
                                <div className="personal">
                                    <p className="color-darkgray">
                                        <span className="weight-semi">ID:</span> { this.state.reservation.idReservacion }
                                    </p>
                                    <div className="white-space-4"></div>
                                    <p className="color-darkgray">
                                        <span className="weight-semi">Pasajeros:</span>  { this.state.reservation.adultos } Adultos,&nbsp;
                                        { this.state.reservation.menores && this.state.reservation.menores } menores
                                    </p>
                                    <div className="white-space-4"></div>
                                    <p className="color-darkgray">
                                        <span className="weight-semi">Tipo de viaje:</span> { this.state.reservation.tipo }
                                    </p>
                                    <div className="white-space-4"></div>
                                    <p className="color-darkgray">
                                        <span className="weight-semi">Tipo de vehículo:</span> { this.state.reservation.vehiculo }
                                    </p>
                                    <div className="white-space-4"></div>
                                    <p className="color-darkgray">
                                        <span className="weight-semi">Hotel:</span> { this.state.reservation.hotel }
                                    </p>
                                    <div className="white-space-24"></div>
                                    <hr/>
                                    <div className="white-space-24"></div>
                                    <h3 className="color-darkgray">
                                        Datos de abordaje
                                    </h3>
                                    <div className="white-space-8"></div>
                                    <p className="color-darkgray">
                                        <span className="weight-semi">Aerolínea:</span> { this.state.reservation.aerolinea }
                                    </p>
                                    <div className="white-space-4"></div>
                                    <p className="color-darkgray">
                                        <span className="weight-semi">Número de vuelo:</span> { this.state.reservation.numeroVuelo }
                                    </p>
                                    { this.state.reservation.FechaLlegada && <>
                                        <div className="white-space-4"></div>
                                        <p className="color-darkgray">
                                            <span className="weight-semi">Fecha y hora de llegada:</span> { this.state.reservation.FechaLlegada } - { this.state.reservation.horaLlegada }
                                        </p> </>
                                    }
                                    { this.state.reservation.fechaSalida && <>
                                        <div className="white-space-4"></div>
                                        <p className="color-darkgray">
                                            <span className="weight-semi">Fecha y hora de salida:</span> { this.state.reservation.fechaSalida } - { this.state.reservation.horaSalida }
                                        </p> </>
                                    }
                                    <div className="white-space-24"></div>
                                    <hr/>
                                    <div className="white-space-24"></div>
                                    <h3 className="color-darkgray">
                                        Datos de pago
                                    </h3>
                                    <div className="white-space-8"></div>
                                    { this.state.reservation.llegada === 1 ? <>
                                        <div className="white-space-4"></div>
                                        <p className="color-darkgray">
                                            <span className="weight-semi">Pago al abordar:</span> { this.state.reservation.llegada ? "Sí" : "No" }
                                        </p> </> :
                                        <p className="color-darkgray">
                                            <span className="weight-semi">Pagado:</span> Sí
                                        </p>
                                    }
                                    <div className="white-space-4"></div>
                                    <p className="color-darkgray">
                                        <span className="weight-semi">Total:</span> ${ this.state.reservation.total }
                                    </p>
                                    {
                                        this.state.reservation.estado === 1 && <>
                                        <div className="white-space-8"></div>
                                        <div className="row">
                                            <button className="btn btn-secondary" type="button" onClick = { this.handleFinish.bind(this, this.state.reservation.idReservacion) }>
                                                Marcar como servicio concluido
                                            </button>
                                        </div> </>
                                    }
                                </div>
                            </div>
                            <button type = "button" className="btn-transparent close-modal" onClick = { () => {  this.setState({ isOpen: !this.state.isOpen }) } }>
                                <i className="fas fa-times color-white"></i>
                            </button>
                        </Modal>
                    </div>
                </div>
            </Layout>
        );
    }



    componentDidMount() {
        this.loadUser();
    }

    /**
     * @name: loadUser
     * @description: Obtener el usuario actual
     */
    async loadUser() {
        const user = await this.props.context.loadUser();
        if (user) {
            this.setState({ user: user.user });
            this.getReservations();
        }
    }

    /**
     * @name: getReservations
     * @description: Obtener todas las reservaciones
     */
    async getReservations() {
        const { result, error } = await request.post('/reservation/getAll');
        if ( result && !result.error ) {
            const currentReservations = result.reservations.filter(reservation => reservation.estado === 1);
            this.setState({ reservations: currentReservations, allReservations: result.reservations });
        } else {
            cogoToast.error(error.message);
        }
    }

    /**
     * @name: getReservation
     * @description: Obtener detalles de una reservación por el ID
     */
    async getReservation(idReservacion) {
        this.setState({ isOpen: true });
        const { result, error } = await request.post('/reservation/get/id', idReservacion);
        if ( result && !result.error ) {
            this.setState({ reservation: result.reservation });
        } else {
            cogoToast.error(error.message);
        }
    }

    /**
     * @name: handleFinish
     * @description: Marcar como una reservación finalizada
     */
    async handleFinish(idReservacion) {
        const { result, error } = await request.patch('/reservation/finish/id', idReservacion);
        if ( result && !result.error ) {
            cogoToast.success("Reservación finalizada");
            setTimeout(() => {
                this.setState({ isOpen: !this.state.isOpen });
                this.getReservations();
            }, 2500);
        } else {
            cogoToast.error(error.message);
        }
    }

    /**
     * @name: showFinished
     * @description: Mostrar las reservaciones filtradas
     */
    showFinished(event) {
        this.setState({ finished: event.target.checked });
        if (!this.state.finished) {
            const FinishedReservations = this.state.allReservations.filter(reservation => reservation.estado === 2);
            this.setState({ reservations: FinishedReservations });
        } else {
            const currentReservations = this.state.allReservations.filter(reservation => reservation.estado === 1);
            this.setState({ reservations: currentReservations });
        }
    }

    /**
     * @function: handleSearch
     * @description: Función para buscar reservaciones por ID
    */   
    handleSearch(event) {
        const { reservations, finished } = this.state;
        this.setState({ query: event.target.value });
        if (event.target.value <= 0) {
            if (finished) {
                const FinishedReservations = this.state.allReservations.filter(reservation => reservation.estado === 2);
                this.setState({ reservations: FinishedReservations });
            } else {
                const currentReservations = this.state.allReservations.filter(reservation => reservation.estado === 1);
                this.setState({ reservations: currentReservations });
            }
        } else {
            const filterValue = reservations.filter(reservation => {
                return `${reservation.idReservacion}`.includes(this.state.query);
            });
            this.setState({ reservations: filterValue });
        }
    }

}

export default Consumer(PageReservations);