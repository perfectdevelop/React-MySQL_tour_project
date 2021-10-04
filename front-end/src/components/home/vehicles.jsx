/**
 *  vehicles.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Sección de vehículos de inicio
*/

import React from 'react';
import { useTranslation } from 'react-i18next';

// Images
import CarAuto from '../../img/car-auto.jpg';
import CarHyundai from '../../img/car-hyundai.jpg';
import CarSprinter from '../../img/car-sprinter.jpg';
import CarSub from '../../img/car-sub.jpg';
import CarToyota from '../../img/car-toyota.jpg';
import CarVW from '../../img/car-vw.jpg';

const Vehicles = () => {
    const { t } = useTranslation();
    return ( 
        <div className="vehicles justify-center">
            <div className="container column">
                <div className="white-space-32"></div>
                <p className="text-center">
                    { t('VEHICLES.SUBTITLE') }
                </p>
                <h2 className="text-center color-darkgray">
                    { t('VEHICLES.TITLE') }
                </h2>
                <div className="white-space-24"></div>
                <div className="vehicles-container" data-flickity='{ "cellAlign": "left", "contain": true, "autoPlay": 4000, "pageDots": false }'>
                    <div className="vehicle-card column">
                        <div className="image responsive-img">
                            <img src = { CarSub } alt="Suburban" title="Suburban" />
                        </div>
                        <div className="title">
                            <h4>
                                V.I.P. Suburban
                            </h4>
                        </div>
                    </div>
                    <div className="vehicle-card column">
                        <div className="image responsive-img">
                            <img src = { CarSprinter } alt="Sprinter" title="Sprinter" />
                        </div>
                        <div className="title">
                            <h4>
                                Sprinter
                            </h4>
                        </div>
                    </div>
                    <div className="vehicle-card column">
                        <div className="image responsive-img">
                            <img src = { CarToyota } alt="Toyota Hiace" title="Toyota Hiace" />
                        </div>
                        <div className="title">
                            <h4>
                                Toyota Hiace
                            </h4>
                        </div>
                    </div>
                    <div className="vehicle-card column">
                        <div className="image responsive-img">
                            <img src = { CarVW } alt="VW Transporter" title="VW Transporter" />
                        </div>
                        <div className="title">
                            <h4>
                                VW Transporter
                            </h4>
                        </div>
                    </div>
                    <div className="vehicle-card column">
                        <div className="image responsive-img">
                            <img src = { CarHyundai } alt="Hyundai" title="Hyundai" />
                        </div>
                        <div className="title">
                            <h4>
                                Hyundai
                            </h4>
                        </div>
                    </div>
                    <div className="vehicle-card column">
                        <div className="image responsive-img">
                            <img src = { CarAuto } alt="Autobus" title="Autobus" />
                        </div>
                        <div className="title">
                            <h4>
                                Autobus
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Vehicles;