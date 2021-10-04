/**
 *  bookin-transfer.jsx
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Página de selección de vehículo
*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/header/header';
import SubHeader from '../components/header/sub-header';
import TransferVehicles from '../components/booking/transfer-vehicles';
import TransferFloating from '../components/booking/transfer-floating';
import Footer from '../components/footer/footer';
import { Consumer } from '../context';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
import WOW from 'wowjs';

// HTTP Client
import Request from '../core/http';
const request = new Request();

class BookingTransfer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            summary: localStorage.getItem('blc_trip_summary') || ''
        }
    }

    render() {
        const { t } = this.props;
        return (
            <div className="booking-transfer column">
                <Helmet>                
                    <title>Best Line Cancún - { t('BOOKING-TRANSFER.METATITLE') }</title>
                </Helmet>
                <Header />
                <SubHeader title = { t('BOOKING-TRANSFER.TITLE') } />
                <div className="white-space-24"></div>
                <div className="justify-center">
                    <div className="container">
                        {
                            this.props.context.loadingVehicles ?
                            <div className="full column loading-vehicles justify-center align-center">
                                <i className="fas fa-spinner fa-spin fa-2x color-secondary"></i>
                                <div className="white-space-16"></div>
                                <p className="weight-medium">
                                    { t('BOOKING-TRANSFER.LOADING') }
                                </p>
                            </div> :
                            <div className="booking-transfer-container row-responsive">
                                <div className="row-responsive">
                                    <TransferVehicles idZone = { this.state.idZone } type = { this.state.summary.type } />
                                    <TransferFloating type = { this.state.summary.type } idZone = { this.state.idZone } arrivalDate = { this.state.summary.arrivalDate } 
                                    depatureDate = { this.state.summary.depatureDate } hotel = { this.state.hotelName } adults = { this.state.summary.adults } 
                                    childrens = { this.state.summary.childrens } vehicle = { this.props.context.transferType } transferName = { this.props.context.transferName }
                                    available = { this.props.context.availableCheckout } />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="white-space-48"></div>
                <Footer />
            </div>
        );
    }

    componentDidMount() {
        window.scrollTo(0,0);
        this.props.context.setLoadingVehicles({ loadingVehicles: true });
        new WOW.WOW({ live: false }).init();
        if (localStorage.getItem('blc_trip_summary') && localStorage.getItem('blc_trip_summary') !== undefined) {
            const summary = JSON.parse(this.state.summary);
            this.setState({ summary });
            this.loadHotel(summary.idHotel);
        } else {
            this.props.history.push('/');
        }     
    }

    async loadHotel(idHotel) {
        const response = await request.get(`/hotels/${idHotel}`);
        if (response && !response.error) {
            if (response.hotel) {
                this.setState({ hotelName: response.hotel.nombre, idZone: response.hotel.idZona });
                this.props.context.setHotel({ idHotel: this.state.summary.idHotel, idZoneHotel: response.hotel.idZona, hotelName: response.hotel.nombre });
                this.props.context.setLoadingVehicles({ loadingVehicles: false });
            } else {
                this.setState({ empty: true, message: response.message });
                this.props.context.setLoadingVehicles({ loadingVehicles: false });
            }
        }  else {
            this.setState({ error: true, message: response.message });
            this.props.context.setLoadingVehicles({ loadingVehicles: false });
        }
    }

    componentWillUnmount() {
        this.props.context.setPreviewRate({ previewRate: 0 });
    }


}

export default withRouter(withTranslation()(Consumer(BookingTransfer)));