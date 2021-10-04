/**
 *  @name: routes.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Manejo de todas las rutas de la aplicación
 * 	@process: 3
*/

import React from "react";
import { GlobalContext } from '../context';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Páginas
import PageLogin from '../pages/login';
import PageReservations from '../pages/reservations';
import PageHotels from '../pages/hotels';
import PageZones from '../pages/zones';
import Page404 from '../pages/404';
import PageTours from '../pages/tours';

// Función para declarar rutas privadas
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        { ...rest }
        render = {
            props => {
                const auth = window.localStorage.getItem("BestLineCancun_Admin");
                if (auth) {
                    return <Component { ...props } />;
                } else {
                    return (
                        <Redirect to = { { pathname: "/", state: { from: props.location } } } />
                    );
                }
            }
        }
    />
);

const Routes = () => (

    <BrowserRouter>
        <GlobalContext>
            <div className="flex main">
                <div className="column full">
                    <Switch>
                        <Route path = "/" exact component = { PageLogin } />
                        <PrivateRoute path = "/reservaciones" exact component = { PageReservations } />
                        <PrivateRoute path = "/hoteles" exact component = { PageHotels } />
                        <PrivateRoute path = "/tours" exact component = { PageTours } />
                        <PrivateRoute path = "/zonas" exact component = { PageZones } />
                        <Route component = { Page404 } />
                    </Switch>
                </div>
            </div>
        </GlobalContext>
    </BrowserRouter>

);

export default Routes;