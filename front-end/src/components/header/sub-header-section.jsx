/**
 *  sub-header-section.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Subheader textos
*/

import React from 'react';

const SubHeaderSection = (props) => (

    <div className="sub-header-section justify-center">
        <div className="container column">
            <h3 className="color-darkgray uppercase">
                { props.title }
            </h3>
            <div className="white-space-8"></div>
            <p>
                { props.description }
            </p>
            <div className="white-space-8"></div>
            {
                props.appointment ?
                <p>
                    <i className="fas fa-chevron-right font-tiny"></i>&nbsp; { props.appointment }
                </p> : null
            }
        </div>
    </div>

);

export default SubHeaderSection;