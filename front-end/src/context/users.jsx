/**
 *  users.js
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Manejador de ejecuciones del Context para Usuarios.
*/

import Request from '../core/http';
const request = new Request();

export async function loadUser() {
    let user = window.localStorage.getItem("BestLineCancun");
    if (user) {        
        user = JSON.parse(user);
        const response = await request.post('/users/tokuser', { user: user.user });
        if (response.data) {
            user.user = JSON.parse(response.data);
        } else {
            user.user = { id: 0, usuario: '', admin: 0 }
        }
        this.setState({ user: user });
        return user;
    }
};

export function login(data) {
    window.localStorage.setItem("BestLineCancun", JSON.stringify(data));
    this.setState({ user: data });
};

export function logout() {
    window.localStorage.setItem("BestLineCancun", '{"auth": false}');
    window.localStorage.removeItem("BestLineCancun");
    this.setState({ user: { auth: false } });
};