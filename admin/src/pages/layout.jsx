/**
 *  @name: layout.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Template de las páginas, preparada para SEO.
*/

import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

// Componentes
import Header from '../components/header';

/**
 *  @param: {String} title: "Título"
 *  @param: {String} description: "Descripción de la página"
 *  @param: {String} keywords: "Etiquetas, para, seo"
*/

const Layout = (props) => {
    
    const { title, description, keywords, children } = props;

    return (
        <Fragment>
            <Helmet>
                <title> { title + " - Best Line Cancún" || "Administrador - Best Line Cancún" } </title>
                <meta name="description" content = { description || "Sitio Web de Administración" } />
                <meta name="keywords" content = { keywords || "Best Line Cancún, Administración" } />
            </Helmet>
            <Header />
            { children }
        </Fragment>
    );

}

export default Layout;