/**
 *  header.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Header de General
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Images
import Logo from '../../img/logo.jpg';
import ES from '../../img/es.png';
import EN from '../../img/en.png';

import i18n from '../../i18n';

class Header extends Component {
    state = {
        location: window.localStorage.getItem('i18nextLng') || 'en'
    }
    render() {
        const { t } = this.props;
        return(
            <header className="column">
                <div className="header-top justify-center">
                    <div className="container justify-between">
                        <div className="left align-center wow fadeInLeft">
                            <p className="color-white">                                
                                { t('HEADER-TOP.OUR SOCIAL') }
                            </p>
                            <div className="social row">
                                <div className="icon">
                                    <a href="https://www.facebook.com/bestlinecancun/" className="color-white" target="_blank" rel="noopener noreferrer follow">
                                        <i className="fab fa-facebook-f font-tiny"></i>
                                    </a>
                                </div>
                                <div className="icon">
                                    <a href="https://www.tripadvisor.com.mx/Attraction_Review-g150807-d16701139-Reviews-Best_Line_Cancun-Cancun_Yucatan_Peninsula.html" target="_blank" className="color-white" rel="noopener noreferrer follow">
                                        <i className="fab fa-tripadvisor font-tiny"></i>
                                    </a>
                                </div>
                                <div className="icon">
                                    <a href="https://api.whatsapp.com/send?phone=529981920397&text=I%2C%20want%20information,%20un%20quote%20or%20make%20a%20transfer%20to" className="color-white" target="_blank" rel="noopener noreferrer follow">
                                        <i className="fab fa-whatsapp font-tiny"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="right wow animated fadeInLeft align-center">
                            <div className="justify-end">
                                <div className="lang">
                                    <div className="flag">
                                        {
                                            this.state.location === 'en' ?
                                            <button className="align-center color-white font-tiny weight-semi" onClick = { this.handleLocale.bind(this) }>
                                                <img width="18" height="18" src = { ES } alt="Español" title="Español" />&nbsp; { t('HEADER-TOP.ESP') }
                                            </button> :
                                            <button className="align-center color-white font-tiny weight-semi" onClick = { this.handleLocale.bind(this) }>
                                                <img width="18" height="18" src = { EN } alt="English" title="English" />&nbsp; { t('HEADER-TOP.ESP') }
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header justify-center">
                    <div className="container justify-between row-responsive">
                        <div className="logo responsive-img">
                            <img src={ Logo } alt="Best Line Cancún Logo" title="Best Line Cancún Logo" className="wow animated fadeIn" />
                        </div>
                        <nav className="row align-center">
                            <div className="nav-item">
                                <Link to="/" className="weight-medium color-darkgray wow animated fadeIn">
                                    { t('HEADER.HOME') }
                                </Link>
                            </div>
                            <div className="nav-item">
                                <Link to="/tours" className="weight-medium color-darkgray wow animated fadeIn">
                                    { t('HEADER.TOURS') }
                                </Link>
                            </div>
                            <div className="nav-item">
                                <Link to="/about" className="color-darkgray weight-medium wow animated fadeIn">
                                    { t('HEADER.ABOUT US') }
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }    

    /**
     * @name: handleLocale
     * @description: Función para cambiar el idioma
    */
    handleLocale() {        
        let language = window.localStorage.getItem('i18nextLng');
        if (language) {
            if (language === 'en') {
                i18n.changeLanguage('es');
                window.localStorage.setItem('i18nextLng', 'es');
                this.setState({ location: 'es' });
                window.location.reload();
            } else {
                i18n.changeLanguage('en');
                window.localStorage.setItem('i18nextLng', 'en');
                this.setState({ location: 'en' });
                window.location.reload();
            }
        }
    }

}

export default withTranslation()(Header);