/**
 *  about.jsx
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Página de Nosotros
*/

import React, { Component } from 'react';
import Header from '../components/header/header';
import SubHeader from '../components/header/sub-header';
import Footer from '../components/footer/footer';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
import WOW from 'wowjs';

class About extends Component {

    render() {
        const { t } = this.props;
        return(
            <div className="about">
                <Helmet>                
                    <title>Best Line Cancún - { t('ABOUTUS.METATITLE') }</title>
                </Helmet>
                <Header />
                <SubHeader title = { t('ABOUTUS.TITLE') } />
                <div className="white-space-32"></div>
                <div className="justify-center">
                    <div className="container column">
                        <div className="row-responsive wow animated fadeIn">
                            <div className="left column">
                                <h2 className="color-darkgray">
                                    Best Line Cancún
                                </h2>
                                <div className="white-space-16"></div>
                                { t('ABOUTUS.DESCRIPTION').split('/n').map(line => <p className="text-justify">{ line }</p>) }
                                <div className="white-space-24"></div>
                                <h3 className="color-darkgray">
                                    { t('ABOUTUS.CONTACT US') }
                                </h3>
                                <div className="white-space-16"></div>
                                <div className="row">
                                    <div className="contact-info color-darkgray weight-medium mr">
                                        <i className="fas fa-phone color-secondary"></i>
                                        <a href="tel:+52 (998) 192 0397" className="font-small"> 
                                            &nbsp; +52 (998) 192 0397
                                        </a>
                                    </div>
                                    <div className="contact-info color-darkgray weight-medium ml">
                                        <i className="fas fa-phone color-secondary"></i>
                                        <a href="tel:+52 (998) 293 1705" className="font-small"> 
                                            &nbsp; +52 (998) 293 1705
                                        </a>
                                    </div>
                                </div>
                                <div className="white-space-24"></div>
                                <div className="row-responsive">
                                    <div className="contact-info color-darkgray weight-medium mr">
                                        <i className="fas fa-envelope-open-text color-secondary"></i>
                                        <a href="mailto:info@bestlinecancun.com" className="font-small"> 
                                            &nbsp; info@bestlinecancun.com
                                        </a>
                                    </div>
                                    <div className="contact-info color-darkgray weight-medium ml">
                                        <i className="fas fa-envelope-open-text color-secondary"></i>
                                        <a href="mailto:reservations@bestlinecancun.com" className="font-small"> 
                                            &nbsp; reservations@bestlinecancun.com
                                        </a>
                                    </div>
                                </div>
                                <div className="white-space-24"></div>
                            </div>
                            <div className="right column">
                                <h2 className="color-darkgray">
                                    F.A.Q's
                                </h2>
                                <div className="white-space-16"></div>
                                <p className="color-darkgray weight-medium font-small">
                                    Q: { t('ABOUTUS.QUESTION1') }
                                </p>
                                <div className="white-space-4"></div>
                                <p>
                                    <span className="font-small color-secondary">A: </span> { t('ABOUTUS.ANSWER1') }
                                </p>
                                <div className="white-space-16"></div>
                                <p className="color-darkgray weight-medium font-small">
                                    Q: { t('ABOUTUS.QUESTION2') }
                                </p>
                                <div className="white-space-4"></div>
                                <p>
                                    <span className="font-small color-secondary">A: </span> { t('ABOUTUS.ANSWER2') }
                                </p>
                                <div className="white-space-16"></div>
                                <p className="color-darkgray weight-medium font-small">
                                    Q: { t('ABOUTUS.QUESTION3') }
                                </p>
                                <div className="white-space-4"></div>
                                <p>
                                    <span className="font-small color-secondary">A: </span> { t('ABOUTUS.ANSWER3') }
                                </p>
                                <div className="white-space-16"></div>
                                <p className="color-darkgray weight-medium font-small">
                                    Q: { t('ABOUTUS.QUESTION4') }
                                </p>
                                <div className="white-space-4"></div>
                                <p>
                                    <span className="font-small color-secondary">A: </span> { t('ABOUTUS.ANSWER4') }
                                </p>
                                <div className="white-space-16"></div>
                                <p className="color-darkgray weight-medium font-small">
                                    Q: { t('ABOUTUS.QUESTION5') }
                                </p>
                                <div className="white-space-4"></div>
                                <p>
                                    <span className="font-small color-secondary">A: </span> { t('ABOUTUS.ANSWER5') }
                                </p>
                                <div className="white-space-24"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="white-space-32"></div>
                <Footer />
            </div>
        );
    }

    componentDidMount() {
        window.scrollTo(0,0);
        new WOW.WOW({ live: false }).init();
    }

}

export default withTranslation()(About);
