/**
 *  index.js
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Punto de Entrada de React
 * 	@process: 1
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-app-polyfill/ie11';
import WebFont from 'webfontloader';
import * as serviceWorker from './serviceWorker';
import './i18n';

// Hoja de estilos
import './sass/style.scss';

// Método para cargar la fuente de Google de manera asíncrona

WebFont.load({
    google: {
        families: ['Poppins:400,500,600,700', 'sans-serif']
    }
})

ReactDOM.render(<App />, document.getElementById('root'));

// Si quieres que tu aplicación funcione sin conexión y se cargue más rápido, puedes cambiar unregister() a register()

serviceWorker.register();
