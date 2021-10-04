/**
 *  transportation.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Card de trasportación
*/

import React from 'react';

const CardDestination = (props) => (
    <div className="destination-card wow animated fadeInUp">
        <div className="image responsive-img">
            <img src = { props.image } alt = { props.alt } title = { props.alt } />
        </div>
        <div className="info full column">
            <h2 className="color-white">
                { props.city }
            </h2>
            <div className="white-space-8"></div>
        </div>
    </div>
);

export default CardDestination;