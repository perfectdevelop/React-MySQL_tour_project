/**
 *  @name: hotels.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Página de /hoteles 
*/

import React, { Component } from 'react';
import { Consumer } from '../context';
import Layout from '../pages/layout';
import Modal from '../components/modals/modal';
import cogoToast from 'cogo-toast';

// HTTP Client
import Request from '../utils/http';
const request = new Request();

class PageTours extends Component {

    state = {
        allHotels: [], hotels: [],
        selectedZone: 1, isOpen: false, query: '', title: '', action: 0,
        idTours: 0, name: '', idZona: 0, Zona: ''
    }

    render() {
        const { hotels } = this.state;
        return (
            <Layout title="Hoteles">
                <div className="hotels justify-center">
                    <div className="container column">
                        <div className="white-space-32"></div>
                        <div className="table column">
                            <div className="options row-responsive align-center">
                                <h4 className="color-darkgray">
                                    Hoteles
                                </h4>
                                <div className="row-responsive">
                                    <div className="input-container">

                                        <input type="text" className="input" placeholder="Buscar hotel"
                                            value={this.state.query} onChange={this.handleSearch.bind(this)} />
                                    </div>
                                    <div className="btn-container">
                                        <button type="button" className="btn btn-primary" onClick={() => { this.setState({ title: 'AÑADIR HOTEL', action: 2, isOpen: !this.state.isOpen, selectedZone: 1 }) }}>
                                            <i className="fas fa-plus"></i> Agregar hotel
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="white-space-16"></div>
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="text-left">Hotel</th>
                                            <th className="text-left">Detalles</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            hotels.map(hotel => (
                                                <tr key = { hotel.idTours }>
                                                    <td className="text-left name"> { hotel.name } </td>
                                                    <td className="button">
                                                        <button className="btn btn-primary btn-radius" type = "button" onClick = { this.getHotel.bind(this, hotel.idTours) }>
                                                            Editar
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="white-space-32"></div>

                        <Modal isOpen={this.state.isOpen} title={this.state.title}>
                            {this.state.action === 1 ?
                                <div className="column">
                                    <div className="personal column">
                                        <div className="row-responsive zone-editor">
                                            <div className="column">
                                                <p>
                                                    Nombre:
                                                </p>
                                                <div className="white-space-4"></div>
                                                <input type="text" value={this.state.name} className="input" placeholder="Nombre del hotel" id="toursname" onChange={(event) => { this.setState({ name: event.target.value }) }} />
                                            </div>
                                            <div className="row">
                                                <div className="btn-container">
                                                    <button className="btn btn-primary btn-radius" type="button" onClick={this.handleUpdate.bind(this)}>
                                                        ACTUALIZAR HOTEL
                                                    </button>
                                                </div>
                                                &nbsp;
                                                <div className="btn-container">
                                                    <button className="btn btn-secondary btn-radius" type="button" onClick={this.handleDelete.bind(this)}>
                                                        ELIMINAR
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <form className="column" onSubmit={this.handleAdd.bind(this)}>
                                    <div className="personal column">
                                        <div className="row-responsive zone-editor">
                                            <div className="column">
                                                <p>
                                                    Nombre:
                                                </p>
                                                <div className="white-space-4"></div>
                                                <input type="text" className="input" placeholder="Nombre del hotel" id="toursname" />
                                            </div>
                                            <div className="btn-container">
                                                <button className="btn btn-primary btn-radius" type="submit">
                                                    AÑADIR HOTEL
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            }
                            <button type="button" className="btn-transparent close-modal" onClick={() => { this.setState({ isOpen: !this.state.isOpen }) }}>
                                <i className="fas fa-times color-white"></i>
                            </button>
                        </Modal>

                    </div>
                </div>
            </Layout>
        );
    }

    componentDidMount() {
        this.loadUser();
    }

    /**
     * @name: loadUser
     * @description: Obtener el usuario actual
     */
    async loadUser() {
        const user = await this.props.context.loadUser();
        if (user) {
            this.setState({ user: user.user });
            this.getHotels();
            // this.getZones();
        }
    }

    /**
     * @name: getHotels
     * @description: Obtener todos los hoteles
     */
    async getHotels() {
        const { result, error } = await request.post('/tours/gettoursAllAdmin');
        if ( result && !result.error ) {
            this.setState({ allHotels: result.hotels, hotels: result.hotels });
        } else {
            cogoToast.error(error.message);
        }
    }

    /**
     * @name: getHotel
     * @description: Obtener la información de un Hotel
     */
    async getHotel(id) {
        this.setState({ title: 'EDITAR HOTEL', action: 1 })
        const { result, error } = await request.post('/tours/getAdminTours', id);
        if (result && !result.error) {
            console.log(result);
            this.setState({
                isOpen: !this.state.isOpen,
                idTours: result.hotel.idTours, name: result.hotel.tours_name,
            });
        } else {
            cogoToast.error(error.message);
        }
    }

    /**
     * @name: getZones
     * @description: Obtener todas las zonas de Hoteles
     */
    // async getZones() {
    //     const { result, error } = await request.post('/tours/getAdminHotelZone');
    //     if (result && !result.error) {
    //         this.setState({ zonas: result.zones });
    //     } else {
    //         cogoToast.error(error.message);
    //     }
    // }

    /**
     * @name: handleUpdate
     * @description: Actualizar un Hotel
    */
    async handleUpdate() {
        const data = { name: this.state.name, idTours: this.state.idTours };
        const { result, error } = await request.patch('/tours/update', data);
        if (result && !result.error) {
            cogoToast.success("Hotel actualizado");
            this.getHotels();
            setTimeout(() => {
                this.setState({ isOpen: !this.state.isOpen });
            }, 2000);
        } else {
            cogoToast.error(error.message);
        }
    }

    /**
     * @function: handleAdd
     * @description: Función para añadir nuevo hotel
    */
    async handleAdd(event) {
        event.preventDefault();
        const form = event.target;
        const data = {
            name: form.toursname.value,
            // idZona: form.idZona.value
        };
        const { result, error } = await request.post('/tours/add', data);
        if (result && !result.error) {
            cogoToast.success("Hotel añadido");
            this.getHotels();
            setTimeout(() => {
                this.setState({ isOpen: !this.state.isOpen });
            }, 2000);
        } else {
            cogoToast.error(error.message);
        }
    }


    /**
     * @name: handleDelete
     * @description: Eliminar un Hotel
    */
    async handleDelete() {
        console.log("handle delete tours")
        const data = { idTours: this.state.idTours };
        console.log(data);
        const { result, error } = await request.post('/tours/delete', data);
        if (result && !result.error) {
            cogoToast.success("Hotel eliminado");
            this.getHotels();
            setTimeout(() => {
                this.setState({ isOpen: !this.state.isOpen });
            }, 2000);
        } else {
            cogoToast.error(error.message);
        }
    }


    /**
     * @function: handleSearch
     * @description: Función para buscar clientes
    */
    handleSearch(event) {
        const { allHotels } = this.state;
        this.setState({ query: event.target.value });
        if (event.target.value <= 0) {
            this.setState({ allHotels });
        } else {
            const filterValue = allHotels.filter(hotel => {
                return `${hotel.name}`.toLowerCase().includes(this.state.query.toLowerCase())
            });
            this.setState({ hotels: filterValue });
        }
    }

}

export default Consumer(PageTours);