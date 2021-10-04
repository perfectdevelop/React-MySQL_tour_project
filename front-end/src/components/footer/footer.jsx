/**
 *  footer.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Footer del sitio
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Images
import ImgFooter from '../../img/footer.jpg';
import Logo from '../../img/logo.jpg';

const Footer = () => {
    const { t } = useTranslation();
    return(    
        <footer className="justify-center" style = {{ backgroundImage: `url(${ImgFooter})` }}>
            <div className="inner-container column wow animated fadeInUp">
                <div className="footer row-responsive">
                    <div className="left column">
                        <div className="logo responsive-img">
                            <img src = { Logo } alt="Best Line Cancún Logo" title="Best Line Cancún Logo" />
                        </div>
                        <div className="white-space-16"></div>
                        <p className="color-darkgray weight-medium legend">
                            { t('FOOTER.DESCRIPTION') }
                        </p>
                        <div className="white-space-16"></div>
                        <div className="social row">
                            <div className="icon">
                                <a href="https://www.facebook.com/bestlinecancun/" className="color-gray" target="_blank" rel="noopener noreferrer follow">
                                    <i className="fab fa-facebook-f font-tiny"></i>
                                </a>
                            </div>
                            <div className="icon">
                                <a href="https://www.tripadvisor.com.mx/Attraction_Review-g150807-d16701139-Reviews-Best_Line_Cancun-Cancun_Yucatan_Peninsula.html" target="_blank" className="color-gray" rel="noopener noreferrer follow">
                                    <i className="fab fa-tripadvisor font-tiny"></i>
                                </a>
                            </div>
                            <div className="icon">
                                <a href="https://api.whatsapp.com/send?phone=529981920397&text=I%2C%20want%20information,%20un%20quote%20or%20make%20a%20transfer%20to" className="color-gray" target="_blank" rel="noopener noreferrer follow">
                                    <i className="fab fa-whatsapp font-tiny"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="right row-responsive">
                        <div className="nav column">
                            <Link to="/about" className="font-regular weight-semi color-darkgray">
                                { t('FOOTER.ABOUT US') }
                            </Link>
                            <div className="white-space-8"></div>
                            <Link to="/about" className="color-darkgray weight-medium">
                                &nbsp;<i className="fas color-gray font-mini fa-chevron-right"></i>&nbsp;{ t('FOOTER.CONTACT') }
                            </Link>
                            <div className="white-space-8"></div>
                            <Link to="/" className="color-darkgray weight-medium">
                                &nbsp;<i className="fas color-gray font-mini fa-chevron-right"></i>&nbsp;{ t('FOOTER.RESERVE NOW') }
                            </Link>
                            <div className="white-space-8"></div>
                            <Link to="/terms" className="color-darkgray weight-medium">
                                &nbsp;<i className="fas color-gray font-mini fa-chevron-right"></i>&nbsp;{ t('FOOTER.LEGAL') }
                            </Link>
                        </div>
                        <div className="nav column">
                            <Link to="/about" className="font-regular weight-semi color-darkgray">
                                { t('FOOTER.ADDRESS') }
                            </Link>
                            <div className="white-space-8"></div>
                            <Link to="/about" className="color-darkgray weight-medium">
                                &nbsp;<i className="fas color-gray font-mini fa-map-marker-alt"></i>&nbsp;SM. 237, Mza. 35, Lte. 5, Zip: 77500, Cancún, México
                            </Link>
                            <div className="white-space-8"></div>
                            <a href="tel:(998) 893 3730" className="color-darkgray weight-medium">
                                &nbsp;<i className="fas color-gray font-mini fa-phone"></i>&nbsp;(998) 893 3730
                            </a>
                            <div className="white-space-8"></div>
                            <a href="mailto:info@bestlinecancun.com" className="color-darkgray weight-medium">
                                &nbsp;<i className="fas color-gray font-mini fa-envelope"></i>&nbsp;info@bestlinecancun.com
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom auto">
                    <p className="color-white font-tiny auto">
                        Best Line Cancún - 2021
                    </p>
                    <p className="color-white font-tiny auto">
                        Cancún, México
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
