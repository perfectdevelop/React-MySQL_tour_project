/**
 *  home.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Página de Inicio
*/

import React, { Component } from 'react';
import Header from '../components/header/header';
import Banner from '../components/home/banner';
import FormQuickBookingTransfers from '../components/forms/quick-booking-transfers';
import Favorites from '../components/home/favorites';
import QuickAbout from '../components/about/quick';
import Vehicles from '../components/home/vehicles';
import AboutReviews from '../components/about/reviews';
import CTAEmail from '../components/cta/email';
import Footer from '../components/footer/footer';
import { Helmet } from 'react-helmet';
import WOW from 'wowjs';

// HTTP Client
import Request from '../core/http';
const request = new Request();

class Home extends Component {

    state = {
        hotels: []
    }    

    render() {
        return (
            <div className="home column">
                <Helmet>                
                    <title>Best Line Cancún - Cancún Airport Shuttle and Cab Private Service</title>
                </Helmet>
                <Header />
                <Banner />
                <FormQuickBookingTransfers hotels = { this.state.hotels } />
                <Favorites />
                <QuickAbout />
                <Vehicles />
                <AboutReviews />
                <CTAEmail />
                <Footer />
            </div>
        );
    }

    componentDidMount() {
        window.scrollTo(0,0);
        new WOW.WOW({ live: false }).init();
        this.loadFlickity();
        this.loadHotels();
    }

    loadFlickity() {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js';
		document.body.append(script);
    }
    
    /**
     * @name: loadHotels
     * @description: Función para obtener la lista de hoteles
    */
    async loadHotels() {
        const response = await request.get('/hotels/all', '');
        if (response && !response.error) {
            if (response.hotels) {
                this.setState({ hotels: response.hotels });
            } else {
                this.setState({ empty: true, message: response.message });
            }
        }  else {
            this.setState({ error: true, message: response.message });
        }
    }
}

export default Home;