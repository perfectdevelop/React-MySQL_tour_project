/**
 *  bookin-transfer-checkout.jsx
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Página de checkout de transfer
*/

import React, { Component } from 'react';
import Header from '../components/header/header';
import SubHeader from '../components/header/sub-header';
import Footer from '../components/footer/footer';
import { Consumer } from '../context';
import { withTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import { Helmet } from 'react-helmet';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import WOW from 'wowjs';

// Imágenes
import ImgCredit from '../img/credit.png';
import ImgDebit from '../img/debit.png';

// HTTP Client
import Request from '../core/http';
const request = new Request();

class BookingTransferCheckout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrivalTime: new Date(), depatureTime: new Date(), data: null, 
            isArrival: false, enabledPaypal: false, loadingPay: false, error: null, created: false
        }
    }

    render() {
        const { t } = this.props;
        let checkoutData = '', vehicleName = '', hotelName = '';
        if (this.props.context.checkoutData) {  checkoutData = this.props.context.checkoutData; }
        if (this.props.context.vehicleName) { vehicleName = this.props.context.vehicleName; }
        if (this.props.context.hotelName) { hotelName = this.props.context.hotelName; }
        return(            
            <div className="booking-transfer-checkout column">
                <Helmet>
                    <title>Best Line Cancún - Checkout</title>
                </Helmet>
                <Header />
                <SubHeader title = "Checkout" />
                <div className="white-space-16"></div>
                <div className="justify-center">
                    <div className="container column">
                        <form className="booking-transfer-container row-responsive wow animated fadeInLeft" id="checkoutForm" onSubmit = { this.handleSubmit.bind(this) }>
                            <div className="left column">
                                <div className="white-space-32"></div>
                                <div className="full form column">
                                    <div className="white-space-16"></div>
                                    <div className="form-subtitle">
                                        <p className="font-medium weight-semi">
                                            <span className="step color-secondary font-medium">1</span> { t('BOOKING-TRANSFER-CHECKOUT.CUSTOMER') }
                                        </p>
                                    </div>
                                    <div className="white-space-16"></div>
                                    <div className="form-section column">
                                        <div className="row-responsive">
                                            <div className="full margin-right">
                                                <label htmlFor="first-name">
                                                    { t('BOOKING-TRANSFER-CHECKOUT.FIRSTNAME') } *
                                                </label>
                                                <div className="white-space-4"></div>
                                                <input type="text" className="input full" required name="firstName" minLength = "4" maxLength = "24" />
                                            </div>
                                            <div className="full margin-left">
                                                <label htmlFor="last-name">
                                                    { t('BOOKING-TRANSFER-CHECKOUT.LASTNAME') } *
                                                </label>
                                                <div className="white-space-4"></div>
                                                <input type="text" className="input full" required name="lastName" minLength = "3" maxLength = "24" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="white-space-16"></div>
                                    <div className="form-section column">
                                        <div className="row-responsive">
                                            <div className="full margin-right">
                                                <label htmlFor="email">
                                                    Email *
                                                </label>
                                                <div className="white-space-4"></div>
                                                <input type="email" className="input full" required name="email" minLength = "8" maxLength = "48" />
                                            </div>
                                            <div className="full margin-left">
                                                <label htmlFor="phone">
                                                    { t('BOOKING-TRANSFER-CHECKOUT.PHONENUMBER') } *
                                                </label>
                                                <div className="white-space-4"></div>
                                                <input type="text" className="input full" required name="phone" minLength = "8" maxLength = "32" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="white-space-32"></div>
                                    <div className="form-subtitle">
                                        <p className="font-medium weight-semi">
                                            <span className="step color-secondary font-medium">2</span> { t('BOOKING-TRANSFER-CHECKOUT.FLIGHT') }
                                        </p>
                                    </div>
                                    <div className="white-space-16"></div>
                                    <div className="form-section column">
                                        <div className="row-responsive">
                                            <div className="full margin-right">
                                                <label htmlFor="airline">
                                                    { t('BOOKING-TRANSFER-CHECKOUT.AIRLINE') } *
                                                </label>
                                                <div className="white-space-4"></div>
                                                <input type="text" className="input full" required name="airline" minLength = "4" maxLength = "48" />
                                            </div>
                                            <div className="full margin-left">
                                                <label htmlFor="phone">
                                                    { t('BOOKING-TRANSFER-CHECKOUT.FLIGHTNUMBER') } *
                                                </label>
                                                <div className="white-space-4"></div>
                                                <input type="text" className="input full" required name="number" minLength = "4" maxLength = "32" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="white-space-16"></div>
                                    {
                                        checkoutData.type === "1" || checkoutData.type === 1 ?
                                        <div className="column">
                                            <div className="form-section column">
                                                <div className="row-responsive">
                                                    <div className="full margin-right">
                                                        <label htmlFor="arrival-date">
                                                            { t('BOOKING-TRANSFER-CHECKOUT.ARRIVAL') } *
                                                        </label>
                                                        <div className="white-space-4"></div>
                                                        <div className="input full">
                                                            <p className="color-darkgray">
                                                                { moment(checkoutData.arrivalDate).format('DD/MM/YYYY') }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="full margin-left">
                                                        <label htmlFor="arrival-time">
                                                            { t('BOOKING-TRANSFER-CHECKOUT.ARRIVALTIME') } *
                                                        </label>
                                                        <div className="white-space-4"></div>
                                                        <DatePicker className="input full" required name="arrivalTime" selected = { this.state.arrivalTime }
                                                        onChange = { (time) => this.setState({ arrivalTime: time }) } timeCaption = "Time"
                                                        showTimeSelectOnly timeIntervals = { 15 } showTimeSelect dateFormat = "HH:mm"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="white-space-16"></div>
                                            <div className="form-section column">
                                                <div className="row-responsive">
                                                    <div className="full margin-right">
                                                        <label htmlFor="arrival-date">
                                                            { t('BOOKING-TRANSFER-CHECKOUT.DEPARTURE') } *
                                                        </label>
                                                        <div className="white-space-4"></div>
                                                        <div className="input full">
                                                            <p className="color-darkgray">
                                                                { moment(checkoutData.depatureDate).format('DD/MM/YYYY') }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="full margin-left">
                                                        <label htmlFor="arrival-time">
                                                            { t('BOOKING-TRANSFER-CHECKOUT.DEPARTURETIME') } *
                                                        </label>
                                                        <div className="white-space-4"></div>
                                                        <DatePicker className="input full" required name="depatureTime" selected = { this.state.depatureTime }
                                                        onChange = { (time) => this.setState({ depatureTime: time }) } timeCaption = "Time"
                                                        showTimeSelectOnly timeIntervals = { 15 } showTimeSelect dateFormat = "HH:mm"  />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                            checkoutData.type === "2" || checkoutData.type === 2 ?
                                            <div className="form-section column">
                                                <div className="row-responsive">
                                                    <div className="full margin-right">
                                                        <label htmlFor="arrival-date">
                                                            { t('BOOKING-TRANSFER-CHECKOUT.ARRIVAL') } *
                                                        </label>
                                                        <div className="white-space-4"></div>
                                                        <div className="input full">
                                                            <p className="color-darkgray">
                                                                { moment(checkoutData.arrivalDate).format('DD/MM/YYYY') }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="full margin-left">
                                                        <label htmlFor="arrival-time">
                                                            { t('BOOKING-TRANSFER-CHECKOUT.ARRIVALTIME') } *
                                                        </label>
                                                        <div className="white-space-4"></div>
                                                        <DatePicker className="input full" required name="arrivalTime" selected = { this.state.arrivalTime }
                                                        onChange = { (time) => this.setState({ arrivalTime: time }) } timeCaption = "Time"
                                                        showTimeSelectOnly timeIntervals = { 15 } showTimeSelect dateFormat = "HH:mm"  />
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="form-section column">
                                                <div className="row-responsive">
                                                    <div className="full margin-right">
                                                        <label htmlFor="arrival-date">
                                                            { t('BOOKING-TRANSFER-CHECKOUT.DEPARTURE') } *
                                                        </label>
                                                        <div className="white-space-4"></div>
                                                        <div className="input full">
                                                            <p className="color-darkgray">
                                                                { moment(checkoutData.depatureDate).format('DD/MM/YYYY') }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="full margin-left">
                                                        <label htmlFor="arrival-time">
                                                            { t('BOOKING-TRANSFER-CHECKOUT.DEPARTURETIME') } *
                                                        </label>
                                                        <div className="white-space-4"></div>
                                                        <DatePicker className="input full" required name="depatureTime" selected = { this.state.depatureTime }
                                                        onChange = { (time) => this.setState({ depatureTime: time }) } timeCaption = "Time"
                                                        showTimeSelectOnly timeIntervals = { 15 } showTimeSelect dateFormat = "HH:mm"  />
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                    <div className="white-space-32"></div>
                                    <div className="form-subtitle">
                                        <p className="font-medium weight-semi">
                                            <span className="step color-secondary font-medium">3</span> { t('BOOKING-TRANSFER-CHECKOUT.PAYMENT') }
                                        </p>
                                    </div>
                                    <div className="white-space-16"></div>
                                    <div className="form-section column">
                                        <p>
                                            { t('BOOKING-TRANSFER-CHECKOUT.PAYMENTDESCRIPTION') }
                                        </p>
                                        <div className="white-space-16"></div>
                                        <div className="align-center">
                                            <label className="checkbox-container">
                                                { t('BOOKING-TRANSFER-CHECKOUT.BUTTONARRIVE') }
                                                <input type="checkbox" name="isArrival" 
                                                onChange = { (event) => { this.setState({ isArrival: event.target.checked }) } } />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="white-space-8"></div>
                                        <div className="images row-responsive">
                                            <div className="responsive-img ">
                                                <img src = { ImgCredit } alt="Credit Card" title="Credit Card"/>
                                            </div> 
                                            <div className="responsive-img ">
                                                <img src = { ImgDebit } alt="Debit Card" title="Debit Card"/>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="white-space-16"></div>
                                    <div className="form-section column">
                                        <p>
                                            { t('BOOKING-TRANSFER-CHECKOUT.TRANSACTIONS') }
                                        </p>
                                    </div>
                                    <div className="white-space-16"></div>
                                    <div className="row">
                                        <Link to="/terms" target="_blank" rel="noopener" className="font-mini terms">
                                            { t('BOOKING-TRANSFER-CHECKOUT.TERMS') } <span className="color-primary font-mini underline">{ t('BOOKING-TRANSFER-CHECKOUT.TERMSSPAN') }</span>
                                        </Link>
                                    </div>
                                    <div className="white-space-32"></div>
                                    <div className="btn-container row wow animated fadeInLeft">
                                        {
                                            this.state.isArrival && 
                                            <button className="full btn btn-secondary color-white" type="submit">
                                                <i className="fas fa-plane-arrival color-white"></i>
                                                &nbsp; { t('BOOKING-TRANSFER-CHECKOUT.BUTTONRESERVE') }
                                            </button>
                                        }
                                        {
                                            !this.state.enabledPaypal ?
                                                !this.state.isArrival &&
                                                <button className="full btn btn-primary color-white" type="submit">
                                                    <i className="fas fa-check color-white"></i>
                                                    &nbsp; { t('BOOKING-TRANSFER-CHECKOUT.BUTTONPAY') }
                                                </button> : null
                                        }
                                    </div>
                                    <div className="white-space-8"></div>
                                    { this.state.enabledPaypal &&
                                        <div className="full">
                                            <PayPalButton 
                                                amount = { this.props.context.checkoutData.rate }
                                                currency = { "USD" }
                                                options = {{
                                                    clientId: "ASsTrMWOhc_Fd29Zyr8sF_OEVOB-M-vfG4pS1_9uh3t9UbuZLMQ46b76FodTtRGeIY1mScSi6RYJAmx-",
                                                    currency: "USD"
                                                }}
                                                onSuccess = { (details) => {
                                                    if (details.status === "COMPLETED") {
                                                        this.paymentResponse(this.state.data);
                                                    } else {
                                                        this.setState({ loadingPay: true, available: false, error: `${ t('BOOKING-TRANSFER-CHECKOUT.ERROR1') }` });
                                                    }
                                                }}
                                                onCancel = { () => { this.setState({ loadingPay: true, available: false, error: `${ t('BOOKING-TRANSFER-CHECKOUT.ERROR2') }` }) } } 
                                                onError = { () => { this.setState({ loadingPay: true, available: false, error: `${ t('BOOKING-TRANSFER-CHECKOUT.ERROR3') }` }) } }
                                                catchError = { () => { this.setState({ loadingPay: true, available: false, error: `${ t('BOOKING-TRANSFER-CHECKOUT.ERROR4') }` }) } }
                                            />
                                        </div>
                                    }
                                    <div className="white-space-8"></div>
                                </div>
                            </div>
                            
                            <div className="right column">
                                <div className="white-space-16"></div>
                                <div className="summary column wow animated fadeInLeft">
                                    <div className="title">
                                        <h3 className="color-darkgray">
                                            { t('BOOKING-TRANSFER-CHECKOUT.SUMMARY') }
                                        </h3>
                                    </div>
                                    <div className="definition row justify-between">
                                        <p> { t('BOOKING-TRANSFER-CHECKOUT.TRANSFER TYPE') }: </p>
                                        <p className="weight-medium">
                                            { 
                                                checkoutData.type === 1 || checkoutData.type === "1" ? `${ t('RESERVE-FORM.ROUND TRIP') }` : checkoutData.type === "2" ? `${ t('RESERVE-FORM.AIRPORT TO HOTEL') }` : `${ t('RESERVE-FORM.HOTEL TO AIRPORT') }`
                                            }
                                        </p>
                                    </div>
                                    { checkoutData.arrivalDate &&
                                        <div className="definition row justify-between">
                                            <p> { t('BOOKING-TRANSFER-CHECKOUT.ARRIVAL') }: </p>
                                            <p className="weight-medium"> { moment(checkoutData.arrivalDate).format('DD/MM/YYYY') }</p>
                                        </div>
                                    }
                                    { checkoutData.depatureDate &&
                                        <div className="definition row justify-between">
                                            <p> { t('BOOKING-TRANSFER-CHECKOUT.DEPARTURE') }: </p>
                                            <p className="weight-medium"> { moment(checkoutData.depatureDate).format('DD/MM/YYYY') }</p>
                                        </div>
                                    }
                                    
                                    <div className="definition row justify-between">
                                        <p> { t('BOOKING-TRANSFER-CHECKOUT.FROM') }: </p>
                                        {
                                            checkoutData.type === 3 || checkoutData.type === "3" ? 
                                            <p className="weight-medium"> { hotelName } </p> :
                                            <p className="weight-medium">Cancún International Airport</p>
                                        }
                                    </div>
                                    <div className="definition row justify-between">
                                        <p> { t('BOOKING-TRANSFER-CHECKOUT.TO') }: </p>
                                        {
                                            checkoutData.type === 3 || checkoutData.type === "3" ?
                                            <p className="weight-medium">Cancún International Airport</p> :
                                            <p className="weight-medium">{ hotelName }</p>
                                        }
                                    </div>
                                    <div className="definition row justify-between">
                                        <p> { t('BOOKING-TRANSFER-CHECKOUT.PASSAGERS') }: </p>
                                        <p className="weight-medium">
                                            {
                                                checkoutData.childrens ? `${ checkoutData.adults } ${ t('BOOKING-TRANSFER-CHECKOUT.ADULTS') }, ${ checkoutData.childrens } ${ t('BOOKING-TRANSFER-CHECKOUT.CHILDRENS') }` : `${ checkoutData.adults } ${ t('BOOKING-TRANSFER-CHECKOUT.ADULTS') }`
                                            }
                                        </p>
                                    </div>
                                    <div className="definition row justify-between">
                                        <p> { t('BOOKING-TRANSFER-CHECKOUT.SERVICE TYPE') }: </p>
                                        <p className="weight-medium">{ vehicleName }</p>
                                    </div>
                                    <div className="definition price row justify-between">
                                        <p className="font-medium"> Total: </p>
                                        <p className="font-medium weight-medium color-primary">
                                            {
                                                `${ checkoutData.rate } USD`
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>            
                <div className="white-space-48"></div>
                <Footer />
                {
                    this.state.loadingPay ?
                    <div className="loading-overlay align-center wow animated fadeIn">
                        <div className="justify-center align-center">
                            {
                                this.state.created ?
                                <div className="container column">
                                    <div className="justify-center">
                                        <div className="icon wow animated fadeIn">
                                            <i className="fas fa-check-circle fa-3x color-success"></i>
                                        </div>
                                    </div>
                                    <div className="white-space-16"></div>
                                    <div className="justify-center">
                                        <h3 className="color-primary text-center wow animated fadeIn">
                                            { t('BOOKING-TRANSFER-CHECKOUT.SUCCESSMESSAGE') } <span role="img" aria-label="Emoji happy">😊</span>
                                        </h3>
                                    </div>
                                    <div className="white-space-16"></div>
                                    <div className="justify-center">
                                        <p className="color-white text-center">
                                            Nothing, everything ok
                                        </p>
                                    </div>
                                    <div className="white-space-16"></div>
                                    <div className="justify-center">
                                        <Link to = "/" className="color-darkgray text-center underline">
                                            { t('BOOKING-TRANSFER-CHECKOUT.CLOSE') }
                                        </Link>
                                    </div>
                                </div>
                                :
                                <div className="container column">
                                    <div className="justify-center">
                                        <div className="icon">
                                            {
                                                this.state.error ?
                                                <i className="fas fa-times fa-3x color-danger"></i>
                                                :
                                                <i className="fas fa-spinner fa-spin fa-3x color-primary"></i>
                                            }
                                        </div>
                                    </div>
                                    <div className="white-space-16"></div>
                                    <div className="justify-center">
                                        <h3 className="color-primary text-center">
                                            {
                                                this.state.error ?
                                                `${ t('BOOKING-TRANSFER-CHECKOUT.ERROR5') }`
                                                :
                                                `${ t('BOOKING-TRANSFER-CHECKOUT.GENERATING') }`
                                            }
                                        </h3>
                                    </div>
                                    <div className="white-space-16"></div>
                                    <div className="justify-center">
                                        <p className="color-darkgray text-center">
                                            { this.state.error }
                                        </p>
                                    </div>
                                    <div className="white-space-16"></div>
                                    <div className="justify-center">
                                        {
                                            this.state.error ?
                                            <Link to = "/pick" className="color-darkgray text-center underline">
                                                { t('BOOKING-TRANSFER-CHECKOUT.TRYAGAIN') }
                                            </Link> :
                                            <p className="color-white text-center">
                                                Nothing
                                            </p>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    : null
                }
            </div>
        );
    }

    componentDidMount() {
        window.scrollTo(0,0);
        new WOW.WOW({ live: false }).init();
        if (!this.props.context.checkoutData || this.props.context.checkoutData === null) {
            this.props.history.push('/');
        }
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const form = event.target;

        let fechaLlegada = '', fechaSalida = '', horaLlegada = '', horaSalida = '';

        if (this.props.context.checkoutData.arrivalDate) { fechaLlegada = moment(this.props.context.checkoutData.arrivalDate).format('YYYY-MM-DD'); }
        if (this.props.context.checkoutData.depatureDate) { fechaSalida = moment(this.props.context.checkoutData.depatureDate).format('YYYY-MM-DD'); }
        if (this.props.context.checkoutData.type === "1" || this.props.context.checkoutData.type === 1) {
            horaLlegada = moment(this.state.arrivalTime).format('HH:mm:ss');
            horaSalida = moment(this.state.depatureTime).format('HH:mm:ss');
        }
        if (this.props.context.checkoutData.type === "2" ) { horaLlegada = moment(this.state.arrivalTime).format('HH:mm:ss'); }
        if (this.props.context.checkoutData.type === "3" ) { horaSalida = moment(this.state.depatureTime).format('HH:mm:ss'); }

        const nombre = form.firstName.value + " " + form.lastName.value;
        const data = {
            idTarifa: this.props.context.checkoutData.idTarifa, adultos: this.props.context.checkoutData.adults, menores: this.props.context.checkoutData.childrens, 
            total: this.props.context.checkoutData.rate, fechaLlegada: fechaLlegada, fechaSalida: fechaSalida, horaLlegada: horaLlegada, 
            horaSalida:  horaSalida, tipo: this.props.context.checkoutData.type, vehiculo: this.props.context.vehicle, 
            nombre: nombre, email: form.email.value, telefono: form.phone.value, aerolinea: form.airline.value, vuelo: form.number.value, 
            hotel: this.props.context.hotelName, isArrival: this.state.isArrival
        };
        if (this.state.isArrival) {
            this.setState({ enabledPaypal: false, data: data });
            this.paymentResponse(data);
        } else {
            this.setState({ enabledPaypal: true, data: data });
        }
    }    

    async paymentResponse(data) {
        const { t } = this.props;
        this.setState({ loadingPay: true });
        const response = await request.post('/reservation/create', data);
        if (response && !response.error) {
            if (response.created) {
                this.setState({ created: true, available: false, error: null });
                setTimeout(() => {
                    this.props.history.push('/');
                }, 6000);
            } else {
                this.setState({ created: false, available: false, error: `${ t('BOOKING-TRANSFER-CHECKOUT.ERROR6') }` });
            }
        } else {
            this.setState({ created: false, available: false, error: `${ t('BOOKING-TRANSFER-CHECKOUT.ERROR7') }` });
        }
    }
}

export default withRouter(withTranslation()(Consumer(BookingTransferCheckout)));