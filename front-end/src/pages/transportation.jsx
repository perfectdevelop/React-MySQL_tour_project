/**
 *  transportation.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Página de Transportación
*/

import React from 'react';
import Header from '../components/header/header';
import SubHeader from '../components/header/sub-header';
import SubHeaderSection from '../components/header/sub-header-section';
import Populars from '../components/transportation/populars';
import CTAEmail from '../components/cta/email';
import Footer from '../components/footer/footer';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const Transportation = () => {
    const { t } = useTranslation();
    return (
        <div className="transportation column">
            <Helmet>                
                <title>Best Line Cancún - { t('TRANSPORTATION.METATITLE') }</title>
            </Helmet>
            <Header />
            <SubHeader title = { t('TRANSPORTATION.TITLE') } />
            <SubHeaderSection title = { t('TRANSPORTATION.SUBTITLE') } description = { t('TRANSPORTATION.CONTENT') } appointment = { t('TRANSPORTATION.CONTENTLIST') } />
            <Populars />
            <CTAEmail />
            <Footer />
        </div>
    ); 
}   

export default Transportation;