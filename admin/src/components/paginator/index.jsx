/**
 *  paginator.jsx
 *  @version: 1.0.0
 *  @author: Absolem - Sergio
 *  @description: Componente para el paginador
*/

import React, { Component } from 'react';

class Paginator extends Component {

    constructor(props){
        super(props);
        this.state = { page: 1, start: 1, end: 5 }
    }

    componentDidUpdate(prevProps) {
        if (this.props.pages !== prevProps.pages) {
            this.setState({ page: 1 });
            this.props.setPage(1);
        }
    }

    /**
     * @function: setPage
     * @params: page: int, scroll: bool
     * @description: Función para páginar, se establece el calculo de páginas, si son menos de 5 páginas se listan del 1 - 5, de ser más se listan del 1 - 5 y agregando 4 elementos más, scroll determinar si el sitio se deslizará hacía arriba o mantendrá su posición.
    */
    setPage(page, scroll) {
        this.props.setPage(page);
        let startPage = 1;
        let endPage = this.props.pages;
        if (page <= 4) {
            startPage = 1;
            endPage = 5;
        } else {
            if (page + 1 >= this.props.pages) {
                startPage = this.props.pages - 4;
                endPage = this.props.pages;
            } else {
                startPage = page - 2;
                endPage = page + 2;
            }
        }
        this.setState({ start: startPage, end: endPage, page: page });
        if (scroll) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        const pages = [];
        let start = this.state.start;
        let end = this.state.end;
        if (end >= this.props.pages) {
            end = this.props.pages;
        }
        for (start; start <= end; start++) {
            pages.push({ index: start });
        }
        return(
            <div className="paginator justify-center align-center">
                <button className="previus color-darkgray font-small" onClick = { () => this.setPage(1, this.props.scroll) }>
                    <i className="fas fa-chevron-left"></i>
                </button>
                {
                    pages.map(page =>
                        <button key = { page.index } onClick = { () => this.setPage(page.index, this.props.scroll) }
                        className = { `page color-darkgray weight-semi font-small ${this.state.page === page.index ? 'page-active' : 'page'}` } >
                            { page.index }
                        </button>
                    )
                }
                <button className="next color-darkgray font-small" onClick = { () => this.setPage(this.props.pages, this.props.scroll) }>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        );
    }

}

export default Paginator;