/**
 *  @name: http.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Cliente HTTP para todas las peticiones Web basada en superagent: GET, POST, DELETE, PUT, PATCH
 *  @param: {string} url: "/EndPoint"
 *  @param: {Object} data: Payload
*/

import request from "superagent";

// API BaseURL
// let baseUrl = 'https://bestlinecancun-api.herokuapp.com';
let baseUrl = 'http://localhost:8081';

class Request {

    get(url, data) {
        const result = request
            .get(baseUrl + url)
            .query(data)
            .set('best_line_cancun_key', '93ae7e36627c9c083dd28c44eef0a4d3f3373edafd1c5bc460f804b1edfbdec1')
            .then(response => {
                const { error } = response.body;
                if (error) {
                    return { error: { message: error.message } };
                } else {
                    return { result: response.body, statusCode: response.status };
                }
            })
            .catch(error => {
                const { status } = error;
                if (status >= 400) {
                    return { error: { message: error.message, statusCode: status } };
                }
                return { error: { message: error.message, statusCode: 503 } };
            });
        return result;
    }

    post(url, data) {
        const result = request
            .post(baseUrl + url)
            .send(data)
            .set('best_line_cancun_key', '93ae7e36627c9c083dd28c44eef0a4d3f3373edafd1c5bc460f804b1edfbdec1')
            .then(response => {
                const { error } = response.body;
                if (error) {
                    return { error: { message: error.message } };
                } else {
                    return { result: response.body, statusCode: response.status };
                }
            })
            .catch(error => {
                return { error: { message: error.message, statusCode: 503 } };
            });
        return result;
    }

    delete(url, data) {
        const result = request
            .delete(baseUrl + url)
            .send(data)
            .set('best_line_cancun_key', '93ae7e36627c9c083dd28c44eef0a4d3f3373edafd1c5bc460f804b1edfbdec1')
            .then(response => {
                const { error } = response.body;
                if (error) {
                    return { error: { message: error.message } };
                } else {
                    return { result: response.body, statusCode: response.status };
                }
            })
            .catch(error => {
                return { error: { message: error.message, statusCode: 503 } };
            });
        return result;
    }

    put(url, data) {
        const result = request
            .put(baseUrl + url)
            .send(data)
            .set('best_line_cancun_key', '93ae7e36627c9c083dd28c44eef0a4d3f3373edafd1c5bc460f804b1edfbdec1')
            .then(response => {
                const { error } = response.body;
                if (error) {
                    return { error: { message: error.message } };
                } else {
                    return { result: response.body, statusCode: response.status };
                }
            })
            .catch(error => {
                return { error: { message: error.message, statusCode: 503 } };
            });
        return result;
    }

    patch(url, data) {
        const result = request
            .patch(baseUrl + url)
            .send(data)
            .set('best_line_cancun_key', '93ae7e36627c9c083dd28c44eef0a4d3f3373edafd1c5bc460f804b1edfbdec1')
            .then(response => {
                const { error } = response.body;
                if (error) {
                    return { error: { message: error.message } };
                } else {
                    return { result: response.body, statusCode: response.status };
                }
            })
            .catch(error => {
                return { error: { message: error.message, statusCode: 503 } };
            });
        return result;
    }

}

export default Request;
