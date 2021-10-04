/**
 *  email.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: CTA de email
*/

import React from 'react';
import { useTranslation } from 'react-i18next';

const CTAEmail = () => {
    const { t } = useTranslation();
    return(
        <div className="cta-suscribe justify-center">
            <div className="container column">
                <div className="row-responsive align-center">
                    <div className="left full column wow animated fadeInLeft">
                        <h3 className="color-white">
                            { t('CTA-EMAIL.TITLE') }
                        </h3>
                    </div>
                    <div className="right full">
                        <div className="row wow animated fadeInRight">
                            <input className="input full" type="email" name="email" placeholder = { t('CTA-EMAIL.PLACEHOLDER') } />
                            <button className="btn btn-primary" type="button">{ t('CTA-EMAIL.BUTTON') }</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CTAEmail;