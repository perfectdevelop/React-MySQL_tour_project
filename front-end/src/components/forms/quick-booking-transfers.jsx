/**
 *  quick-booking-transfers.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Busqueda rápida de transfers
*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Modal from '../modals';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import { Consumer } from '../../context';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Request from '../../core/http';

class FormQuickBookingTransfers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrivalDate: new Date(), depatureDate: new Date(),
            selectedType: 1, adults: 1, childrens: 0, idHotel: 1, isOpen: false,
            hotelName: 'Ambiance Suites Cancún', fullName: '', email: '', phone: '',
        }
    }

    render() {
        const minDate = new Date();
        const { t } = this.props;
        return(
            <div className="reserve-form justify-center">
                <div className="container column">
                    <div className="white-space-32"></div>
                    <h2 className="text-center color-darkgray">
                        { t('RESERVE-FORM.TITLE') }
                    </h2>
                    <div className="white-space-16"></div>
                    <form className="full column">
                        <div className="justify-between row" id="reserve-inputs">
                            <div className="type input-group column">
                                <p className="color-darkgray weight-medium">
                                    { t('RESERVE-FORM.TYPE') }
                                </p>
                                <div className="white-space-8"></div>
                                <select name="type" className="input-select" value = { this.state.selectedType } 
                                onChange = { (event) => this.setState({ selectedType: event.target.value }) } >
                                    <option value="1"> { t('RESERVE-FORM.ROUND TRIP') } </option>
                                    <option value="2"> { t('RESERVE-FORM.AIRPORT TO HOTEL') } </option>
                                    <option value="3"> { t('RESERVE-FORM.HOTEL TO AIRPORT') } </option>
                                </select>
                            </div>
                            {
                            this.state.selectedType === "3" ?
                            (null) :
                            (
                                <div className="date-arrival input-group column">
                                    <p className="color-darkgray weight-medium">
                                        { t('RESERVE-FORM.ARRIVAL') }
                                    </p>
                                    <div className="white-space-8"></div>
                                    <DatePicker selected = { this.state.arrivalDate } className="input-picker"
                                    onChange = { (date) => this.setState({ arrivalDate: date }) } minDate = { minDate } />
                                </div>
                            )
                            }
                            {
                            this.state.selectedType === "2" ?
                            (null) :
                            (
                                <div className="date-depature input-group column">
                                    <p className="color-darkgray weight-medium">
                                        { t('RESERVE-FORM.DEPARTURE') }
                                    </p>
                                    <div className="white-space-8"></div>
                                    <DatePicker selected = { this.state.depatureDate } className="input-picker"
                                    onChange = { (date) => this.setState({ depatureDate: date }) } minDate = { minDate }  />
                                </div>
                            )
                            }
                            <div className="hotel input-group column">
                                <p className="color-darkgray weight-medium">
                                    { t('RESERVE-FORM.HOTEL') }
                                </p>
                                <div className="white-space-8"></div>
                                <Select classNamePrefix = "input-select-component" className="input-select" options = { this.props.hotels } placeholder = "Pick a Hotel"
                                onChange = { (event) => this.setState({ idHotel: event.value, hotelName: event.label }) }  />
                            </div>
                            <div className="adults input-group column">
                                <p className="color-darkgray weight-medium">
                                    { t('RESERVE-FORM.ADULTS') }
                                </p>
                                <div className="white-space-8"></div>
                                <input type="number" name="adults" placeholder="Adults" className="input" 
                                value = { this.state.adults } onChange = { (event) => this.setState({ adults: event.target.value }) } />
                            </div>
                            <div className="adults input-group column">
                                <p className="color-darkgray weight-medium">
                                    { t('RESERVE-FORM.CHILDRENS') }
                                </p>
                                <div className="white-space-8"></div>
                                <input type="number" name="childrens" placeholder="Childrens" className="input"
                                value = { this.state.childrens } onChange = { (event) => this.setState({ childrens: event.target.value }) } />
                            </div>
                        </div>
                        <div className="white-space-24"></div>
                        <div className="btn-container justify-center">
                            <button type="button" onClick = { this.handleSubmit.bind(this) } className="btn btn-primary font-small">
                                <i className="fas fa-search"></i>&nbsp; { t('RESERVE-FORM.SEARCH')}
                            </button>
                        </div>
                        <div className="white-space-32"></div>
                    </form>
                </div>
                <Modal title = { t('RESERVE-MODAL.TITLE') } isOpen = { this.state.isOpen }>
                    <form className="content column" onSubmit = { this.handleSpecial.bind(this) }>
                        <p className="color-darkgray weight-medium text-center">
                            { t('RESERVE-MODAL.DESCRIPTION') }
                        </p>
                        <div className="white-space-32"></div>
                        <div className="row-responsive basic">
                            <div className="adults input-group column">
                                <p className="color-darkgray weight-medium">
                                    { t('RESERVE-MODAL.HOTEL') }
                                </p>
                                <div className="white-space-8"></div>
                                <input type="text" name="hotelName" placeholder="Hotel Name" className="input" readOnly 
                                value = { this.state.hotelName } />
                            </div>
                            <div className="adults input-group column">
                                <p className="color-darkgray weight-medium">
                                    { t('RESERVE-FORM.ADULTS') }
                                </p>
                                <div className="white-space-8"></div>
                                <input type="number" name="adults" placeholder="Adults" className="input" required
                                value = { this.state.adults } onChange = { (event) => this.setState({ adults: event.target.value }) } />
                            </div>
                            <div className="adults input-group column">
                                <p className="color-darkgray weight-medium">
                                    { t('RESERVE-FORM.CHILDRENS') }
                                </p>
                                <div className="white-space-8"></div>
                                <input type="number" name="childrens" placeholder="Childrens" className="input" required
                                value = { this.state.childrens } onChange = { (event) => this.setState({ childrens: event.target.value }) } />
                            </div>
                        </div>
                        <div className="white-space-32"></div>
                        <div className="row-responsive basic">
                            <div className="adults input-group column">
                                <p className="color-darkgray weight-medium">
                                    { t('RESERVE-MODAL.FULLNAME') }
                                </p>
                                <div className="white-space-8"></div>
                                <input type="text" name="fullName" placeholder="Full name" className="input" required
                                value = { this.state.fullName } onChange = { (event) => this.setState({ fullName: event.target.value }) } />
                            </div>
                            <div className="adults input-group column">
                                <p className="color-darkgray weight-medium">
                                    { t('RESERVE-MODAL.EMAIL') }
                                </p>
                                <div className="white-space-8"></div>
                                <input type="email" name="email" placeholder="Email" className="input" required
                                value = { this.state.email } onChange = { (event) => this.setState({ email: event.target.value }) } />
                            </div>
                            <div className="adults input-group column">
                                <p className="color-darkgray weight-medium">
                                    { t('RESERVE-MODAL.PHONE') }
                                </p>
                                <div className="white-space-8"></div>
                                <input type="text" name="phone" placeholder="Phone" className="input" required
                                value = { this.state.phone } onChange = { (event) => this.setState({ phone: event.target.value }) } />
                            </div>
                        </div>
                        <div className="white-space-32"></div>
                        <div className="row-responsive dates">
                        { this.state.selectedType === "3" ?
                            (null) :
                            ( <div className="date-arrival input-group column">
                                    <p className="color-primary weight-medium font-small">
                                        { t('RESERVE-FORM.ARRIVAL') }
                                    </p>
                                    <div className="white-space-8"></div>
                                    <p className="color-darkgray text-center weight-semi">
                                        { moment(this.state.arrivalDate).format('DD/MM/YYYY') }
                                    </p>
                                </div> )
                        }
                        {
                        this.state.selectedType === "2" ?
                        (null) :
                        ( <div className="date-depature input-group column">
                                <p className="color-primary weight-medium font-small">
                                    { t('RESERVE-FORM.DEPARTURE') }
                                </p>
                                <div className="white-space-8"></div>
                                <p className="color-darkgray text-center weight-semi">
                                    { moment(this.state.depatureDate).format('DD/MM/YYYY') }
                                </p>
                            </div> )
                        }
                        </div>
                        <div className="white-space-32"></div>
                        <div className="btn-container justify-center">
                            <button className="btn btn-primary">
                                { t('RESERVE-MODAL.BUTTON') }
                            </button>
                        </div>
                        <div className="white-space-32"></div>
                    </form>
                    <button type = "button" className="btn-transparent close-modal" onClick = { () => { this.setState({ isOpen: !this.state.isOpen }) } }>
                        <i className="fas fa-times color-white"></i>
                    </button>
                </Modal>
            </div>
        );
    }

    handleSubmit() {
        let adults = parseInt(this.state.adults);
        let childrens = parseInt(this.state.childrens);
        if ((adults + childrens) > 14 || adults > 14 ) {
            this.setState({ isOpen: !this.state.isOpen });
        } else {
            let arrivalDate = '', depatureDate = ''
            if (this.state.selectedType === "1" || this.state.selectedType === 1) {
                arrivalDate = this.state.arrivalDate;
                depatureDate = this.state.depatureDate;
            }
            if (this.state.selectedType === "2") { arrivalDate = this.state.arrivalDate; }
            if (this.state.selectedType === "3") { depatureDate = this.state.depatureDate; }
            const data = { 
                type: this.state.selectedType, arrivalDate: arrivalDate, depatureDate: depatureDate,
                idHotel: this.state.idHotel, adults: adults, childrens: childrens 
            };
            localStorage.setItem('blc_trip_summary', JSON.stringify(data));
            this.props.context.setCheckoutData({ checkoutData: data });
            this.props.history.push('/pick');
        }
    }

    async handleSpecial(event) {
        const { t } = this.props;
        let data = null;
        event.preventDefault();
        let adults = parseInt(this.state.adults);
        let childrens = parseInt(this.state.childrens);
        if ((adults + childrens) <= 14 || adults <= 14 ) { 
            alert(t('RESERVE-MODAL.ALERT'));
            return false;
        }
        if (this.state.selectedType === 1 || this.state.selectedType === "1") {
            data = {
                selectedType: "1",
                hotelName: this.state.hotelName,
                adults: this.state.adults,
                childrens: this.state.childrens,
                fullName: this.state.fullName,
                email: this.state.email,
                phone: this.state.email,
                arrivalDate: moment(this.state.arrivalDate).format('YYYY-MM-DD'),
                depatureDate: moment(this.state.depatureDate).format('YYYY-MM-DD')
            };
        }
        if (this.state.selectedType === 2 || this.state.selectedType === "2") {
            data = {
                selectedType: "2",
                hotelName: this.state.hotelName,
                adults: this.state.adults,
                childrens: this.state.childrens,
                fullName: this.state.fullName,
                email: this.state.email,
                phone: this.state.email,
                arrivalDate: moment(this.state.arrivalDate).format('YYYY-MM-DD'),
                depatureDate: false
            };
        }
        if (this.state.selectedType === 3 || this.state.selectedType === "3") {
            data = {
                selectedType: "3",
                hotelName: this.state.hotelName,
                adults: this.state.adults,
                childrens: this.state.childrens,
                fullName: this.state.fullName,
                email: this.state.email,
                phone: this.state.email,
                arrivalDate: false,
                depatureDate: moment(this.state.depatureDate).format('YYYY-MM-DD')
            };
        }
        const request = new Request();
        const response = await request.post('/reservation/special', data);
        if (response && !response.error) {
            if (response.send) {
                this.setState({ send: true, error: null, isOpen: false });
                alert(t('RESERVE-MODAL.SUCCESS'));
            } else {
                this.setState({ send: false, error: `${ t('BOOKING-TRANSFER-CHECKOUT.ERROR6') }` });
            }
        } else {
            this.setState({ send: false, error: `${ t('BOOKING-TRANSFER-CHECKOUT.ERROR7') }` });
        }
        
    }

}


export default withRouter(withTranslation()(Consumer(FormQuickBookingTransfers)));