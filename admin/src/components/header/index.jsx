/**
 *  @name: header.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Componente Header
*/

/**
 * TODO: Responsive Header
 */

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Consumer } from '../../context';

// Images
import Logo from '../../img/logo.jpg';

const Header = (props) => (

    <header className="justify-center">
        <div className="container row-responsive align-center">
            <div className="logo full">
                <Link to = "/tablero">
                    <img src = { Logo } alt="Logo" />
                </Link>
            </div>
            <nav className="full">
                <NavLink exact to = "/reservaciones" className="nav-item weight-medium" activeClassName = "nav-active">
                    <i className="fas fa-shuttle-van"></i> Reservaciones
                </NavLink>
                <NavLink exact to = "/hoteles" className="nav-item weight-medium" activeClassName = "nav-active">
                    <i className="fas fa-hotel"></i> Hoteles
                </NavLink>
                <NavLink exact to = "/tours" className="nav-item weight-medium" activeClassName = "nav-active">
                    <i className="fas fa-umbrella-beach"></i> Tours
                </NavLink>
                <NavLink exact to = "/zonas" className="nav-item weight-medium" activeClassName = "nav-active">
                    <i className="fas fa-road"></i> Zonas
                </NavLink>
                <Link to = "#" className="nav-item weight-medium btn-transparent" onClick = { props.context.logout }>
                    <i className="fas fa-window-close"></i> Salir
                </Link>
            </nav>
        </div>
    </header>

);

export default Consumer(Header);