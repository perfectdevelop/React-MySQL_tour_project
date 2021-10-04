/**
 *  transfer-vehicle.jsx
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Sección de selección de vehículo
*/

import React, { Component } from 'react';
import CardTransferVehicle from '../cards/transfers-vehicle';
import { Consumer } from '../../context';
import { withTranslation } from 'react-i18next';

// Imágenes
import ImgCollective from '../../img/car-collective.jpg';
import ImgPrivate from '../../img/car-private.jpg';
import ImgVip from '../../img/car-vip.jpg';

class TransferVehicles extends Component {    

    render() {
        const { t } = this.props;
        return(
            <div className="left column">
                <div className="white-space-16"></div>
                {
                    this.props.idZone < 23 ?
                    (
                    <div className="row-responsive">
                        {
                            this.props.type === 1 || this.props.type === "1" ? null :
                            <CardTransferVehicle id = { 1 } vehicle = { 1 } image = { ImgCollective } vehicleName = { t('BOOKING-TRANSFER.COLLECTIVE') } delay = "0.15s" />
                        }
                        <CardTransferVehicle id = { 2 } vehicle = { 2 } image = { ImgPrivate } vehicleName = { t('BOOKING-TRANSFER.PRIVATE') } delay = "0.25s" />
                        <CardTransferVehicle id = { 3 } vehicle = { 3 } image = { ImgVip } vehicleName = { t('BOOKING-TRANSFER.VIP') } delay = "0.35s" />
                    </div>
                    ) :
                    (
                    <div className="row-responsive">
                        <CardTransferVehicle id = { 2 } vehicle = { 2 } image = { ImgPrivate } vehicleName = { t('BOOKING-TRANSFER.PRIVATE') } delay = "0.15s" />
                        <CardTransferVehicle id = { 3 } vehicle = { 3 } image = { ImgVip } vehicleName = { t('BOOKING-TRANSFER.VIP') } delay = "0.25s" />
                        <div className="card-vehicle card-vehicle-empty"></div>
                    </div>
                    )
                }
            </div>
        );
    }

}

export default withTranslation()(Consumer(TransferVehicles));