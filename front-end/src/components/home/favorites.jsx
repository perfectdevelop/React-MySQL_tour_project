/**
 *  favorites.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Sección de favoritos
*/

import React from 'react';
import CardDestination from '../cards/destination';
import { useTranslation } from 'react-i18next';

// Images
import Cancun from '../../img/fav-cancun.jpg';
import Playa from '../../img/fav-playa.jpg';
import Akumal from '../../img/fav-akumal.jpg';

const Favorites = () => {
    const { t } = useTranslation();
    return (
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
                <div className="destination-card-container row">
                    <CardDestination alt = "Cancún" image = { Cancun } city = "Cancún" link = "cancun" />
                    <CardDestination alt = "Playa del Carmen" image = { Playa } city = "Playa del Carmen" link = "playa"  />
                    <CardDestination alt = "Akumal" image = { Akumal } city = "Akumal" link = "akumal"  />
                </div>
            </div>
        </div>

    );
}

export default Favorites;