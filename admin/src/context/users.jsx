/**
 *  users.js
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Manejador de ejecuciones del Context para Usuarios.
*/

// HTTP Cliente
import Request from '../utils/http';
const request = new Request();

/**
 * @function: login
 * @param: data: Object
 * @description: Función para asignar Token de usuario al estado global
*/
export function login(data) {
    window.localStorage.setItem("BestLineCancun_Admin", JSON.stringify(data));
    window.localStorage.setItem("BestLineCancun_Admin_Nombre", data.name);
    this.setState({ user: data });
};


/**
 * @function: logout
 * @param: data: Object
 * @description: Función para remover Token de usuario del estado global y del local storage
*/
export function logout() {
    window.localStorage.removeItem("BestLineCancun_Admin");
    window.localStorage.removeItem('BestLineCancun_Admin_Nombre');
    window.location = "/";
};

/**
 * @function: loadUser
 * @description: Función para resolver el Token de usuario y asignarlo al estado global.
*/
export async function loadUser() {    
    let token = window.localStorage.getItem("BestLineCancun_Admin");
    let payload = null;
    if (token) { 
        payload = JSON.parse(token);
        const { result, error } = await request.post('/users/token', payload);
        if ( result && !result.error ) {
            payload = JSON.parse(result.data);
            this.setState({ user: payload });
            if (payload.idRol === 1) {
                window.localStorage.setItem("Absmkt_CRM_Role", true);
            } else {
                window.localStorage.setItem("Absmkt_CRM_Role", false);
            }
        } else {
            console.log(error.message);
            this.setState({ user: null });
        }
        return payload;
    }
    this.setState({ user: null });
};