/**
 *  @name: zones.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Página de /zonas 
*/

import React, { Component } from 'react';
import { Consumer } from '../context';
import Layout from '../pages/layout';
import Modal from '../components/modals/modal';
import cogoToast from 'cogo-toast';

// HTTP Client
import Request from '../utils/http';
const request = new Request();

class PageZones extends Component {

    state = {
        zones: [], zone: [], zona: '', hotels: [], isOpen: false, title: '', action: 0, idTarifas: [],
        collectivoAH: 0, privadoAH1: 0, privadoAH5: 0, privadoAH9: 0, vipAH1: 0, vipAH5: 0, vipAH9: 0,
        collectivoHA: 0, privadoHA1: 0, privadoHA5: 0, privadoHA9: 0, vipHA1: 0, vipHA5: 0, vipHA9: 0,
        roundPriv1: 0, roundPriv5: 0, roundPriv9: 0, roundVip1: 0, roundVip5: 0, roundVip9: 0, allowCollective: false
    };

    render() {
        const { zones, hotels } = this.state;
        return(
            <Layout title = "Zonas">
                <div className="hotels justify-center">
                    <div className="container column">
                        <div className="white-space-32"></div>
                        <div className="table column">
                            <div className="options row-responsive align-center">
                                <h4 className="color-darkgray">
                                    Zonas
                                </h4>
                            </div>
                            <div className="white-space-16"></div>
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="text-left">Zona</th>
                                            <th className="text-left">Hoteles</th>
                                            <th className="text-left">Tarifario</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            zones.map((zone, key) => (
                                                <tr key = { key }>
                                                    <td className="text-left name"> { zone.zona + " - " + zone.nombre } </td>
                                                    <td className="button">
                                                        <button className="btn btn-secondary btn-radius" type = "button" onClick = { this.handleHotels.bind(this, zone.idZona) }>
                                                            Ver
                                                        </button>
                                                    </td>
                                                    <td className="button">
                                                        <button className="btn btn-primary btn-radius" type = "button"
                                                        onClick = { this.handleGetPriceZone.bind(this, zone.idZona, zone.zona) }>
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
                        <Modal isOpen = { this.state.isOpen } title = { this.state.title }>
                            { this.state.action === 1 ?
                                <div className="column">
                                    <div className="hotelist column">
                                        { hotels &&
                                            hotels.map((hotel, key) => (
                                            <p key = { key }>
                                                { hotel.nombre }
                                            </p>
                                        ))
                                        }
                                    </div>
                                </div>
                                :
                                <form className="column" onSubmit = { this.handleSubmit.bind(this) }>
                                    <div className="personal column">
                                        <div className="justify-center">
                                            <h3>
                                                Zona: { this.state.zona }
                                            </h3>
                                        </div>
                                        <div className="row-responsive zone-editor">
                                            <div className="column priceslist">
                                                <div className="row-responsive full">
                                                    <div className="full column align-center">
                                                        <p>
                                                            Collectivo Aeropuerto al Hotel:
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="collectivoAH"
                                                        value = { this.state.collectivoAH } onChange = { (event) => { this.setState({ collectivoAH: event.target.value }) } } 
                                                        disabled = { 
                                                            this.state.collectivoAH === 0 || this.state.collectivoAH === 0.00 || 
                                                            this.state.collectivoAH === "0" || this.state.collectivoAH === "0.00" ? true : false 
                                                        } />
                                                    </div>
                                                    <div className="full column align-center">
                                                        <p>
                                                            Privado Aeropuerto al Hotel: 1 - 4 Pasajeros
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="privadoAH1" required
                                                        value = { this.state.privadoAH1 } onChange = { (event) => { this.setState({ privadoAH1: event.target.value  }) } }  />
                                                    </div>
                                                </div>
                                                <div className="row-responsive full">
                                                    <div className="full column align-center">
                                                        <p> Privado Aeropuerto al Hotel: 5 - 8 Pasajeros </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="privadoAH5" required
                                                        value = { this.state.privadoAH5 } onChange = { (event) => { this.setState({ privadoAH5: event.target.value  }) } }  />
                                                    </div>
                                                    <div className="full column align-center">
                                                        <p>
                                                            Privado Aeropuerto al Hotel: 9 - 14 Pasajeros
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="privadoAH9" required
                                                        value = { this.state.privadoAH9 } onChange = { (event) => { this.setState({ privadoAH9: event.target.value  }) } }  />
                                                    </div>
                                                </div>
                                                <div className="row-responsive full">
                                                    <div className="full column align-center">
                                                        <p>
                                                            VIP Aeropuerto al Hotel: 1 - 4 Pasajeros
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="vipAH1" required
                                                        value = { this.state.vipAH1 } onChange = { (event) => { this.setState({ vipAH1: event.target.value  }) } }  />
                                                    </div>
                                                    <div className="full column align-center">
                                                        <p>
                                                            VIP Aeropuerto al Hotel: 5 - 8 Pasajeros
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="vipAH5" required
                                                        value = { this.state.vipAH5 } onChange = { (event) => { this.setState({ vipAH5: event.target.value  }) } } />  
                                                    </div>
                                                </div>
                                                <div className="row-responsive full">
                                                    <div className="full column align-center">
                                                        <p>
                                                            VIP Aeropuerto al Hotel: 9 - 14 Pasajeros
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="vipAH9" required
                                                        value = { this.state.vipAH9 } onChange = { (event) => { this.setState({ vipAH9: event.target.value  }) } } />
                                                    </div>
                                                    <div className="full column align-center">
                                                        <p>
                                                            Collectivo Hotel al Aeropuerto:
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="collectivoHA"
                                                        value = { this.state.collectivoHA } onChange = { (event) => { this.setState({ collectivoHA: event.target.value  }) } }
                                                        disabled = { 
                                                            this.state.collectivoHA === 0 || this.state.collectivoHA === 0.00 || 
                                                            this.state.collectivoHA === "0" || this.state.collectivoHA === "0.00" ? true : false 
                                                        } />  
                                                    </div>
                                                </div>
                                                <div className="row-responsive full">
                                                    <div className="full column align-center">
                                                        <p>
                                                            Privado Hotel al Aeropuerto: 1 - 4
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="privadoHA1" required
                                                        value = { this.state.privadoHA1 } onChange = { (event) => { this.setState({ privadoHA1: event.target.value  }) } } />
                                                    </div>
                                                    <div className="full column align-center">
                                                        <p>
                                                            Privado Hotel al Aeropuerto: 5 - 8
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="privadoHA5" required
                                                        value = { this.state.privadoHA5 } onChange = { (event) => { this.setState({ privadoHA5: event.target.value  }) } } />
                                                    </div>
                                                </div>
                                                <div className="row-responsive full">
                                                    <div className="full column align-center">
                                                        <p>
                                                            Privado Hotel al Aeropuerto: 9 - 14
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="privadoHA9" required
                                                        value = { this.state.privadoHA9 } onChange = { (event) => { this.setState({ privadoHA9: event.target.value  }) } } />
                                                    </div>
                                                    <div className="full column align-center">
                                                        <p>
                                                            VIP Hotel al Aeropuerto: 1 - 4
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="vipHA1" required
                                                        value = { this.state.vipHA1 } onChange = { (event) => { this.setState({ vipHA1: event.target.value  }) } } />
                                                    </div>
                                                </div>
                                                <div className="row-responsive full">
                                                    <div className="full column align-center">
                                                        <p>
                                                            VIP Hotel al Aeropuerto: 5 - 8
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="vipHA5" required
                                                        value = { this.state.vipHA5 } onChange = { (event) => { this.setState({ vipHA5: event.target.value  }) } } />
                                                    </div>
                                                    <div className="full column align-center">
                                                        <p>
                                                            VIP Hotel al Aeropuerto: 9 - 14
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="vipHA9" required
                                                        value = { this.state.vipHA9 } onChange = { (event) => { this.setState({ vipHA9: event.target.value  }) } } />
                                                    </div>
                                                </div>
                                                <div className="row-responsive full">
                                                    <div className="full column align-center">
                                                        <p>
                                                            Redondo Privado Aeropuerto al Hotel: 1 - 4
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="roundPriv1" required
                                                        value = { this.state.roundPriv1 } onChange = { (event) => { this.setState({ roundPriv1: event.target.value  }) } } />
                                                    </div>
                                                    <div className="full column align-center">
                                                        <p>
                                                            Redondo Privado Aeropuerto al Hotel: 5 - 8
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="roundPriv5" required
                                                        value = { this.state.roundPriv5 } onChange = { (event) => { this.setState({ roundPriv5: event.target.value  }) } } />
                                                    </div>
                                                </div>
                                                <div className="row-responsive full">
                                                    <div className="full column align-center">
                                                        <p>
                                                            Redondo Privado Aeropuerto al Hotel: 9 - 14
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="roundPriv9" required
                                                        value = { this.state.roundPriv9 } onChange = { (event) => { this.setState({ roundPriv9: event.target.value  }) } } />
                                                    </div>
                                                    <div className="full column align-center">
                                                        <p>
                                                            Redondo VIP Aeropuerto al Hotel: 1 - 4
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="roundVip1" required
                                                        value = { this.state.roundVip1 } onChange = { (event) => { this.setState({ roundVip1: event.target.value  }) } } />
                                                    </div>
                                                </div>
                                                <div className="row-responsive full">
                                                    <div className="full column align-center">
                                                        <p>
                                                            Redondo VIP Aeropuerto al Hotel: 5 - 8
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="roundVip5" required
                                                        value = { this.state.roundVip5 } onChange = { (event) => { this.setState({ roundVip5: event.target.value  }) } } />
                                                    </div>
                                                    <div className="full column align-center">
                                                        <p>
                                                            Redondo VIP Aeropuerto al Hotel: 9 - 14
                                                        </p>
                                                        <div className="white-space-4"></div>
                                                        <input type="number" className="input" placeholder = "Precio" id="roundVip9" required
                                                        value = { this.state.roundVip9 } onChange = { (event) => { this.setState({ roundVip9: event.target.value  }) } } />  
                                                    </div>
                                                </div>
                                                <div className="btn-container">
                                                <button className="btn btn-primary btn-radius" type = "submit">
                                                    ACTUALIZAR TARIFA
                                                </button>
                                            </div>
                                            </div> 
                                        </div>
                                    </div>
                                </form>
                            }
                            <button type = "button" className="btn-transparent close-modal" onClick = { () => {  this.setState({ isOpen: !this.state.isOpen }) } }>
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
            this.getZones();
        }
    }

    /**
     * @name: getZones
     * @description: Obtener todas las zonas
     */
    async getZones() {
        const { result, error } = await request.post('/zones/getAdminZones');
        if ( result && !result.error ) {
            this.setState({ zones: result.zones }); 
        } else {
            cogoToast.error(error.message);
        }
    }

    /**
     * @name: handleHotels
     * @description: Obtener todas los hoteles de una zona
    */
    async handleHotels(id) {
        this.setState({ action: 1, isOpen: !this.state.isOpen, title: 'LISTA DE HOTELES', hotels: [] });
        const { result, error } = await request.post('/zones/getAdminZonesHotels', id);
        if ( result && !result.error ) {
            this.setState({ hotels: result.hotels }); 
        } else {
            cogoToast.error(error.message);
        }
    }

    /**
     * @name: handleGetPriceZone
     * @description: Obtener el tarifario de la zona
    */
    async handleGetPriceZone(id, zona) {
        this.setState({ action: 2, isOpen: !this.state.isOpen, title: 'TARIFARIO', zona: zona });
        const { result, error } = await request.post('/zones/zonesPrice_Admin_Get', id);
        if ( result && !result.error ) {
            const idTarifas = result.rates.map(idTarifa => idTarifa.id_tarifa );
            this.setState({
                idTarifas: idTarifas,
                collectivoAH: result.rates[0].precio, 
                privadoAH1: result.rates[1].precio, privadoAH5: result.rates[2].precio, privadoAH9: result.rates[3].precio, 
                vipAH1: result.rates[4].precio, vipAH5: result.rates[5].precio, vipAH9: result.rates[6].precio,
                collectivoHA: result.rates[7].precio, 
                privadoHA1: result.rates[8].precio, privadoHA5: result.rates[9].precio, privadoHA9: result.rates[10].precio,
                vipHA1: result.rates[11].precio, vipHA5: result.rates[12].precio, vipHA9: result.rates[13].precio,
                roundPriv1: result.rates[14].precio, roundPriv5: result.rates[15].precio, roundPriv9: result.rates[16].precio, 
                roundVip1: result.rates[17].precio, roundVip5: result.rates[18].precio, roundVip9: result.rates[19].precio
            });
        } else {
            cogoToast.error(error.message);
        }
    }


    /**
     * @name: handleSubmit
     * @description: Función para actualizar la tarifa
    */
    async handleSubmit(event) {
        event.preventDefault();
        let collectiveAH = true, collectivoHA = true;
        let data = null;
        if (!this.state.collectivoAH || this.state.collectivoAH === 0 || this.state.collectivoAH < 1 || this.state.collectivoAH.length === 0) {
            collectiveAH = false;
        }
        if (!this.state.collectivoHA || this.state.collectivoHA === 0 || this.state.collectivoHA < 1 || this.state.collectivoHA.length === 0) {
            collectivoHA = false;
        }
        if (collectiveAH && collectivoHA) {
            data = {
                collective: true, idTarifas: this.state.idTarifas,
                tarifas: [
                    this.state.collectivoAH,
                    this.state.privadoAH1, 
                    this.state.privadoAH5, 
                    this.state.privadoAH9, 
                    this.state.vipAH1,
                    this.state.vipAH5, 
                    this.state.vipAH9,
                    this.state.collectivoHA,
                    this.state.privadoHA1, 
                    this.state.privadoHA5, 
                    this.state.privadoHA9,
                    this.state.vipHA1, 
                    this.state.vipHA5, 
                    this.state.vipHA9,
                    this.state.roundPriv1, 
                    this.state.roundPriv5, 
                    this.state.roundPriv9, 
                    this.state.roundVip1, 
                    this.state.roundVip5, 
                    this.state.roundVip9
                ]
            };
        } else {
            data = {
                idTarifas: this.state.idTarifas,
                tarifas: [
                    null,
                    this.state.privadoAH1, 
                    this.state.privadoAH5, 
                    this.state.privadoAH9, 
                    this.state.vipAH1,
                    this.state.vipAH5, 
                    this.state.vipAH9,
                    null,
                    this.state.privadoHA1, 
                    this.state.privadoHA5, 
                    this.state.privadoHA9,
                    this.state.vipHA1, 
                    this.state.vipHA5, 
                    this.state.vipHA9,
                    this.state.roundPriv1, 
                    this.state.roundPriv5, 
                    this.state.roundPriv9, 
                    this.state.roundVip1, 
                    this.state.roundVip5, 
                    this.state.roundVip9
                ]
            };
        }
        const { result, error } = await request.patch('/zones/zonesPrice_Admin_Update', data);
        if ( result && !result.error ) {
            if (result.updated) {
                cogoToast.success("Tarifario actualizado");
            } else {
                cogoToast.error("Algunas tarifas no fueron actualizadas, recarga la página");
            }
        } else {
            cogoToast.error(error.message);
        }
    }
    
}

export default Consumer(PageZones);