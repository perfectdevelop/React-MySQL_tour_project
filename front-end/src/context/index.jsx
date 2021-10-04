/**
 *  index.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Manejador principal del estado global de la aplicación.
*/

import React, { Component, createContext } from 'react';
import { setHotel } from './hotels';
import { setVehicleType, setLoadingVehicles } from './vehicles';
import { setPreviewRate, setLoadingPreviewRate, setAvailableCheckout } from './rates';
import { setCheckoutData } from './checkout';

// Instancia del Context, métodos: Provider y Consumer

const Context = createContext();

class GlobalContext extends Component {

    state = {
        init: null,
        setHotel: setHotel.bind(this),
        setLoadingVehicles: setLoadingVehicles.bind(this),
        setVehicleType: setVehicleType.bind(this),
        setPreviewRate: setPreviewRate.bind(this),
        setLoadingPreviewRate: setLoadingPreviewRate.bind(this),
        setAvailableCheckout: setAvailableCheckout.bind(this),
        setCheckoutData: setCheckoutData.bind(this)
    };    

    render() {
        return (
            <Context.Provider value = { this.state }>
                { this.props.children }
            </Context.Provider>
        );
    }
}

/**
 * @function: Consumer
 * @description: HOC conector entre el estado global y un componente consumidor.
 * @param: Component => Componente Web
*/

const Consumer = Component => {
    return props => {
        return (
            <Context.Consumer>
                { context => <Component { ...props } context = { context } /> }
            </Context.Consumer>
        );
    };
};

export { Consumer, GlobalContext };