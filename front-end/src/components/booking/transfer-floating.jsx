/**
 *  transfer-floating.jsx
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Sección flotante del intinerario
*/

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Consumer } from '../../context';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const TransferFloating = (props) => {
    const { t } = useTranslation();
    return(
        <div className="right column">
            <div className="white-space-16"></div>
            <div className="summary column wow animated fadeInLeft">
                <div className="title">
                    <h3 className="color-darkgray">
                        { t('BOOKING-TRANSFER.SUMMARY') }
                    </h3>
                </div>
                <div className="definition row justify-between">
                    <p> { t('BOOKING-TRANSFER.TRANSFER TYPE') }: </p>
                    <p className="weight-medium">
                        { 
                            props.type === 1 || props.type === "1" ? `${ t('RESERVE-FORM.ROUND TRIP') }` : props.type === "2" ? `${ t('RESERVE-FORM.AIRPORT TO HOTEL') }` : `${ t('RESERVE-FORM.HOTEL TO AIRPORT') }`
                        }
                    </p>
                </div>
                {
                    props.arrivalDate ?
                    <div className="definition row justify-between">
                        <p> { t('BOOKING-TRANSFER.ARRIVAL') }: </p>
                        <p className="weight-medium"> { moment(props.arrivalDate).format('DD/MM/YYYY') }</p>
                    </div> : null
                }
                {
                    props.depatureDate ?
                    <div className="definition row justify-between">
                        <p> { t('BOOKING-TRANSFER.DEPARTURE') }: </p>
                        <p className="weight-medium"> { moment(props.depatureDate).format('DD/MM/YYYY') }</p>
                    </div> : null
                }
                
                <div className="definition row justify-between">
                    <p> { t('BOOKING-TRANSFER.FROM') }: </p>
                    {
                    props.type === 3 || props.type === "3" ? 
                        <p className="weight-medium"> { props.hotel } </p> :
                        <p className="weight-medium">Cancún International Airport</p>
                    }
                </div>
                <div className="definition row justify-between">
                    <p> { t('BOOKING-TRANSFER.TO') }: </p>
                    {
                    props.type === 3 || props.type === "3" ?
                        <p className="weight-medium">Cancún International Airport</p> :
                        <p className="weight-medium">{ props.hotel }</p>   
                    }
                </div>
                <div className="definition row justify-between">
                    <p className=""> { t('BOOKING-TRANSFER.PASSAGERS') }: </p>
                    <p className="weight-medium">
                        {
                            props.childrens ? `${ props.adults } ${ t('BOOKING-TRANSFER.ADULTS') }, ${ props.childrens } ${ t('BOOKING-TRANSFER.CHILDRENS') }` : `${ props.adults } ${ t('BOOKING-TRANSFER.ADULTS') }`
                        }
                    </p>
                </div>
                <div className="definition row justify-between">
                    <p> { t('BOOKING-TRANSFER.SERVICE TYPE') }: </p>
                    <p className="weight-medium">{ props.context.vehicleName }</p>
                </div>
                <div className="definition price row justify-between">
                    <p className="font-medium"> Total: </p>
                    <p className="font-medium weight-medium color-primary">
                        {
                            props.context.loadingPreviewRate ? <i className="fas fa-spinner fa-spin"></i> :
                            props.context.previewRate ? `${ props.context.previewRate } USD` : "00.00 USD"
                        }
                    </p>
                </div>
            </div>
            <div className="btn-container row wow animated fadeInLeft">
                {
                    props.available ?
                    <button className="full btn btn-primary color-white" 
                        onClick = { () => props.history.push('/checkout') } >
                            <i className="fas fa-check color-white"></i>
                            &nbsp; { t('BOOKING-TRANSFER.RESERVE') }
                    </button>   
                    :
                    <button className="full btn btn-primary color-white">
                        <i className="fas fa-check color-white"></i>
                        &nbsp; { t('BOOKING-TRANSFER.RESERVE') }
                    </button>
                }
            </div>
        </div>
    );
}
export default withRouter(Consumer(TransferFloating));