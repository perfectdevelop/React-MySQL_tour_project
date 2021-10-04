/**
 *  @name: login.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Página de Login
*/

import React, { useState, useEffect } from 'react';
import { Consumer } from '../context';
import { withRouter } from 'react-router-dom';
import cogoToast from 'cogo-toast';

// Imágenes
import Logo from '../img/logo.jpg';

// HTTP Client
import Request from '../utils/http';

const PageLogin = (props) => {
    const [loginRequest, setLoginRequest] = useState({
        loading: false,
        error: false
    });

    // Validar si el usuario está logeado
    useEffect(() => {
        if (window.localStorage.getItem("BestLineCancun_Admin")) {
            props.history.push('/reservaciones');
        }
    }, [props.history]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginRequest({ loading: true });
        const request = new Request();
        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        const { result, error } = await request.post('/users/login', data);
        if ( result && !result.error ) {
            setLoginRequest({ loading: false, error: false });
            props.context.login({ user: result.user, name: result.name, auth: true });
            setTimeout(() => {
                props.history.push('/reservaciones');
            },2500);
        } else {
            cogoToast.error(error.message);
            setLoginRequest({ loading: false });
        }
    }

    return(
        <div className="login column">
            <div className="justify-center align-center">
                <div className="container">
                    <div className="justify-center align-center">
                        <form className="login-area column" onSubmit = { handleSubmit }>
                            <div className="white-space-32"></div>
                            <div className="responsive-img justify-center align-center wow fadeIn">
                                <img src = { Logo } alt="Best Line Cancún Logo" title="Best Line Cancún Logo"/> 
                            </div>
                            <div className="white-space-32"></div>
                            <div className="input-group row justify-center wow fadeIn" data-wow-delay="0.25s">
                                <div className="icon align-center">
                                    <i className="fas fa-at"></i>
                                </div>
                                <input type="email" className="input" required name="email" minLength = "6" maxLength = "64" 
                                placeholder="Correo electrónico" />
                            </div>
                            <div className="white-space-16"></div>
                            <div className="input-group row justify-center wow fadeIn" data-wow-delay="0.35s">
                                <div className="icon align-center">
                                    <i className="fas fa-key"></i>
                                </div>
                                <input type="password" required minLength = "4" maxLength = "32" className="input" 
                                name="password" placeholder="Contraseña" />
                            </div>
                            <div className="white-space-16"></div>
                            <div className="btn-container justify-center wow fadeIn" data-wow-delay="0.45s">
                                <button type="submit" className="btn btn-radius btn-primary">
                                    { loginRequest.loading ?
                                        <i className="fas fa-spinner fa-spin"></i> : "INGRESA" 
                                    }
                                </button>
                            </div>
                            <div className="white-space-24"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Consumer(PageLogin));