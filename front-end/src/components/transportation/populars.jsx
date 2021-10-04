/**
 *  populars.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Sección de destinos populares
*/


import React from 'react';
import CardDestination from '../cards/destination';

// Images
import Cancun from '../../img/fav-cancun.jpg';
import Playa from '../../img/fav-playa.jpg';
import Akumal from '../../img/fav-akumal.jpg';
import Isla from '../../img/fav-isla.jpg';
import Tulum from '../../img/fav-tulum.jpg';
import Bacalar from '../../img/fav-bacalar.jpg';
import Holbox from '../../img/fav-holbox.jpg';
import Puerto from '../../img/fav-puerto.jpg';
import Sian from '../../img/fav-sian.jpg';
import Xcalak from '../../img/fav-xcalak.jpg';
import Merida from '../../img/fav-merida.jpg';
import Valladolid from '../../img/fav-valladolid.jpg';
import PuertoVen from '../../img/fav-puertoaventura.jpg';
import Leona from '../../img/fav-leona.jpg';
import IslaBlanca from '../../img/fav-islablanca.jpg';
import { useTranslation } from 'react-i18next';

const Populars = () => {
    const { t } = useTranslation();
    return(    
        <div className="favorites justify-center">
            <div className="container column">
                <div className="white-space-32"></div>
                <p className="text-center">
                    { t('FAVORITES.SUBTITLE') }
                </p>
                <h2 className="text-center color-darkgray">
                    { t('FAVORITES.TITLE') }
                </h2>
                <div className="white-space-16"></div>
                <div className="destination-card-container row-responsive">
                    <CardDestination alt = "Cancún" image = { Cancun } city = "Cancún" link = "cancun" />
                    <CardDestination alt = "Playa del Carmen" image = { Playa } city = "Playa del Carmen" link = "playa"  />
                    <CardDestination alt = "Akumal" image = { Akumal } city = "Akumal" link = "akumal"  />
                </div>
                <div className="destination-card-container row-responsive">
                    <CardDestination alt = "Isla Mujeres" image = { Isla } city = "Isla Mujeres" link = "/isla-mujeres" />
                    <CardDestination alt = "Tulumn" image = { Tulum } city = "Tulum" link = "tulum"  />
                    <CardDestination alt = "Bacalar" image = { Bacalar } city = "Bacalar" link = "bacalar"  />
                </div>
                <div className="destination-card-container row-responsive">
                    <CardDestination alt = "Holbox Island" image = { Holbox } city = "Holbox Island" link = "holbox" />
                    <CardDestination alt = "Puerto Morelos" image = { Puerto } city = "Puerto Morelos" link = "puerto-morelos"  />
                    <CardDestination alt = "Sian Ka’an" image = { Sian } city = "Sian Ka’an" link = "sian-ka-an"  />
                </div>
                <div className="destination-card-container row-responsive">
                    <CardDestination alt = "Xcalak" image = { Xcalak } city = "Xcalak" link = "xcalak" />
                    <CardDestination alt = "Mérida" image = { Merida } city = "Mérida" link = "merida"  />
                    <CardDestination alt = "Valladolid" image = { Valladolid } city = "Valladolid" link = "valladolid"  />
                </div>
                <div className="destination-card-container row-responsive">
                    <CardDestination alt = "Puerto Aventura" image = { PuertoVen } city = "Puerto Aventuras" link = "chiquila" />
                    <CardDestination alt = "Leona Vicario" image = { Leona } city = "Leona Vicario" link = "leona-vicario"  />
                    <CardDestination alt = "Isla Blanca" image = { IslaBlanca } city = "Isla Blanca" link = "isla-blanca"  />
                </div>
            </div>
        </div>
    );
}

export default Populars;