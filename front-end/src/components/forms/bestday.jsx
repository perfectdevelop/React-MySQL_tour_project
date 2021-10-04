/**
 *  bestday.jsx
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Componente de BestDay
*/

import React from 'react';
import { useTranslation } from 'react-i18next';

const BestDay = () => {
    const { t } = useTranslation();
    return (
        <div className="bd-engine justify-center">
            <div className="container column">
                <div className="white-space-32"></div>
                <h2 className="text-center color-darkgray">
                    { t('BESTDAY.TITLE') }
                </h2>
                <div className="white-space-16"></div>
                <div className="right" id="liquidBoxContainer"></div>
                <div className="white-space-48"></div>
            </div>
        </div>
    );
}

export default BestDay;