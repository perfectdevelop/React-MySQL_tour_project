/**
 *  sub-header.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Subheader de páginas
*/

import React from 'react';

// Imágenes
import ImgHeader from '../../img/home-slide1.jpg';

const SubHeader = (props) => (
    <div className="sub-header justify-center" style={{ backgroundImage: `url(${ImgHeader})` }} >
        <div className="container column">
            <h2 className="color-white uppercase">
                { props.title }
            </h2>
        </div>
    </div>
);

export default SubHeader;