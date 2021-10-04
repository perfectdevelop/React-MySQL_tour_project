/**
 *  http.js
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Cliente HTTP para todas las peticiones Web
*/

import request from "superagent";

let baseUrl = 'https://bestlinecancun-api.herokuapp.com';;

class Request {

    get(url, data) {
        const result = request
            .get(baseUrl + url)
            .query(data)
            .set({ 'best_line_cancun_key': '93ae7e36627c9c083dd28c44eef0a4d3f3373edafd1c5bc460f804b1edfbdec1' })
            .then(response => {
                return response.body;
            })
            .catch(error => {
                console.log(error.message);
                return { message: error.message };
            });
        return result;
    }

    post(url, data) {
        const result = request
            .post(baseUrl + url)
            .send(data)
            .set({ 'best_line_cancun_key': '93ae7e36627c9c083dd28c44eef0a4d3f3373edafd1c5bc460f804b1edfbdec1' })
            .then(response => {
                return response.body;
            })
            .catch(error => {
                console.log(error.message);
                return { message: error.message };
            });
        return result;
    }
}

export default Request;
