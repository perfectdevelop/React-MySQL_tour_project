/**
 *  transfers-vehicle.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Tarjetas de selección de tipo de servicio transfer
*/

import React, { Component } from 'react';
import { Consumer } from '../../context';
import { withTranslation } from 'react-i18next';

// Imágenes
import ImgSeats from '../../img/transfer-seat.png';
import ImgBags from '../../img/transfer-bag.png';

// HTTP Client
import Request from '../../core/http';
const request = new Request();

class CardTransferVehicle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            summary: localStorage.getItem('blc_trip_summary') || ''
        }
    }

    render() {
        const { t } = this.props;
        return(
            <div className="card-vehicle column wow animated fadeInLeft" id = { `card-vehicle-${this.props.id}` } data-wow-delay = { this.props.delay }>
                <div className="image responsive-img justify-center align-center">
                    <img src = { this.props.image } alt="Suburban" title="Suburban" className="cover-img" />
                </div>
                <div className="description column">
                    <div className="type">
                        <h3 className="color-darkgray weight-medium">
                            { this.props.vehicleName }
                        </h3>
                    </div>
                    <div className="characteristics row align-center">
                        <div className="icon">
                            <img src = { ImgSeats } alt="Seat" title="Seats" />
                        </div>
                        <div className="info column">
                            <p className="font-mini weight-medium color-gray">
                                &nbsp; { t('BOOKING-TRANSFER.IDEAL') }:
                            </p>
                            <p className="full weight-medium color-gray">
                                &nbsp; 1 - 15 { t('BOOKING-TRANSFER.PASSAGERS') }
                            </p>
                        </div>
                    </div>
                    <div className="characteristics row align-center">
                        <div className="icon">
                            <img src = { ImgBags } alt="Bags" title="Bags" />
                        </div>
                        <div className="info">
                            <p className="font-mini weight-medium color-gray">
                                &nbsp; { t('BOOKING-TRANSFER.CAPACITY') }:
                            </p>
                            <p className="full weight-medium color-gray">
                                &nbsp; { t('BOOKING-TRANSFER.UP TO') }
                            </p>
                        </div>
                    </div>
                    <div className="white-space-8"></div>
                    <div className="btn-container">
                        <button className="full btn btn-secondary color-white" onClick = { this.handleType.bind(this, this.props.vehicle, this.props.vehicleName) }>
                            { t('BOOKING-TRANSFER.SELECT') }
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (localStorage.getItem('blc_trip_summary') && localStorage.getItem('blc_trip_summary') !== undefined) {
            const summary = JSON.parse(this.state.summary);
            this.setState({ summary });
            this.props.context.setCheckoutData({ checkoutData: summary });
        }
    }

    /**
     * @function: handleType
     * @params: vechicle: int, vehicleName: string
     * @description: Función para asignar el tipo de viaje de servicio al LocalStorage
    */
    handleType(vehicle, vehicleName) {
        if (document.getElementById(`card-vehicle-1`)) {
            document.getElementById(`card-vehicle-1`).classList.remove('active-vehicle');
        }
        document.getElementById(`card-vehicle-2`).classList.remove('active-vehicle');
        document.getElementById(`card-vehicle-3`).classList.remove('active-vehicle');
        let activeVehicle = document.getElementById(`card-vehicle-${vehicle}`);
        activeVehicle.classList.add('active-vehicle');
        this.props.context.setLoadingPreviewRate({ loadingPreviewRate: true });
        this.props.context.setVehicleType({ vehicle, vehicleName });
        this.handleRate(vehicle);
    }

    /**
     * @function: handleRate
     * @param: vehicle: int (1: Colectivo, 2: Privado, 3: VIP) 
     * @description: Función para calcular la tárifa
    */
    async handleRate(vehicle) {
        let min, max, passagers;
        passagers = parseInt(this.state.summary.adults) + parseInt(this.state.summary.childrens);
        if (vehicle === 1) {
            min = 0; max = 0;
        } else {
            if ( passagers > 8 ) {
                min = 9; max = 14;
            } else {
                if ( passagers > 4 ) {
                    min = 5; max = 8;
                } else {
                    min = 1; max = 4;
                }
            }
        }
        let data, previewRate;
        if (this.state.summary.type === 3 || this.state.summary.type === "3") {
            data = {
                origen: this.props.context.idZoneHotel, destino: 1, tipo: 2, vehiculo: vehicle, min: min, max: max
            };
        } else {
            data = {
                origen: 1, destino: this.props.context.idZoneHotel, tipo: this.state.summary.type, vehiculo: vehicle, min: min, max: max
            };
        }
        const response = await request.post('/rates/price', data);
        if (response && !response.error) {
            if (response.rate) {
                if (vehicle === 1) {
                    previewRate = passagers * parseFloat(response.rate.precio);
                } else {
                    previewRate = response.rate.precio;
                }
                this.props.context.setLoadingPreviewRate({ loadingPreviewRate: false });
                this.props.context.setPreviewRate({ previewRate });
                let checkoutData = this.props.context.checkoutData;
                this.props.context.setCheckoutData({ checkoutData: Object.assign(checkoutData, { rate: previewRate.toString(), idTarifa: response.rate.idTarifa }) });
                this.props.context.setAvailableCheckout({ availableCheckout: true });
            } else {
                this.setState({ empty: true, message: response.message });
                this.props.context.setLoadingPreviewRate({ loadingPreviewRate: false });
            }
        } else {
            this.setState({ error: true, message: response.message });
            this.props.context.setLoadingPreviewRate({ loadingPreviewRate: false });
        }
    }

}

export default withTranslation()(Consumer(CardTransferVehicle));