/**
 *  quick.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Sección rápida de about
*/

import React from 'react';
import { useTranslation } from 'react-i18next';

// Images
import AboutCash from '../../img/about-cash.png';
import AboutRadar from '../../img/about-radar.png';
import AboutTime from '../../img/about-time.png';
import AboutVan from '../../img/about-van.png';

const QuickAbout = () => {
    const { t } = useTranslation();
    return (
        <div className="about justify-center">
            <div className="container column">
                <div className="row-responsive">
                    <div className="left column wow animated fadeInLeft">
                        <h3 className="color-white">
                            Best Line Cancún 
                        </h3>
                        <p className="color-white font-tiny">
                            { t('ABOUT.DESCRIPTION') }
                        </p>
                        <div className="line-divider-white"></div>
                        <h4 className="color-white">
                            <i className="fas fa-award color-white"></i>&nbsp; { t('ABOUT.OUR GUARANTEES') }
                        </h4>
                        <div className="white-space-16"></div>
                        <p className="color-white">
                            * { t('ABOUT.GUARANTEE1') }
                        </p>
                        <div className="white-space-8"></div>
                        <p className="color-white">
                            * { t('ABOUT.GUARANTEE2') }
                        </p>
                        <div className="white-space-8"></div>
                        <p className="color-white">
                            * { t('ABOUT.GUARANTEE3') }
                        </p>
                        <div className="white-space-8"></div>
                        <p className="color-white">
                            * { t('ABOUT.GUARANTEE4') }
                        </p>
                        <div className="white-space-16"></div>
                    </div>
                    <div className="right column justify-between">
                        <div className="row-responsive">
                            <div className="about-card column wow animated fadeInLeft" data-wow-delay="0.1s">
                                <div className="icon justify-center">
                                    <img src = { AboutCash } alt="Mejor precio" title="Mejor precio" />
                                </div>
                                <div className="info column">
                                    <div className="white-space-8"></div>
                                    <h4 className="text-center">
                                        { t('ABOUT.CARD1TITLE') }
                                    </h4>
                                    <p className="text-center color-gray">
                                        { t('ABOUT.CARD1CONTENT') }
                                    </p>
                                </div>
                            </div>
                            <div className="about-card column wow animated fadeInLeft" data-wow-delay="0.25s">
                                <div className="icon justify-center">
                                    <img src = { AboutTime } alt="Tiempo de espera" title = "Tiempo de espera" />
                                </div>
                                <div className="info column">
                                    <div className="white-space-8"></div>
                                    <h4 className="text-center">
                                        { t('ABOUT.CARD2TITLE') }
                                    </h4>
                                    <p className="text-center color-gray">
                                        { t('ABOUT.CARD2CONTENT') }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row-responsive row-responsive-second">
                            <div className="about-card column wow animated fadeInLeft" data-wow-delay="0.1s">
                                <div className="icon justify-center">
                                    <img src = { AboutVan } alt="Vehículos modernos" title="Vehículos modernos" />
                                </div>
                                <div className="info column">
                                    <div className="white-space-8"></div>
                                    <h4 className="text-center">
                                        { t('ABOUT.CARD3TITLE') }
                                    </h4>
                                    <p className="text-center color-gray">
                                        { t('ABOUT.CARD3CONTENT') }
                                    </p>
                                </div>
                            </div>
                            <div className="about-card column wow animated fadeInLeft" data-wow-delay="0.25s">
                                <div className="icon justify-center">
                                    <img src = { AboutRadar } alt="Monitoreo del vuelo" title = "Monitoreo del vuelo" />
                                </div>
                                <div className="info column">
                                    <div className="white-space-8"></div>
                                    <h4 className="text-center">
                                        { t('ABOUT.CARD4TITLE') }
                                    </h4>
                                    <p className="text-center color-gray">
                                        { t('ABOUT.CARD4CONTENT') }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default QuickAbout;