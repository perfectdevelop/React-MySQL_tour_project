/**
 *  routes.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Manejo de todas las rutas de la aplicación
 * 	@process: 3
 */

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Conexión con el Context API
import { GlobalContext } from "../context";

// Páginas Web
import Home from '../pages/home';
import Transportation from '../pages/transportation';
import BookingTransfer from '../pages/booking-transfer';
import BookingTransferCheckout from '../pages/booking-transfer-checkout';
import About from '../pages/about';
import Terms from '../pages/terms';
import Tours from '../pages/tours';

class Routes extends Component {    
    render() { 
        return (
            <GlobalContext>
                    <BrowserRouter>
                        <div className="flex main">
                            <div className="column full">
                                <Switch>
                                    <Route path="/" exact component = { Home } />
                                    <Route path="/transportation" exact component = { Transportation } />
                                    <Route path="/pick" exact component = { BookingTransfer } />
                                    <Route path="/checkout" exact component = { BookingTransferCheckout } />
                                    <Route path="/about" exact component = { About } />
                                    <Route path="/terms" exact component = { Terms } />
                                    <Route path="/tours" exact component = { Tours } />
                                </Switch>
                            </div>
                        </div>
                    </BrowserRouter>
            </GlobalContext>
        );
    }
}

export default Routes;