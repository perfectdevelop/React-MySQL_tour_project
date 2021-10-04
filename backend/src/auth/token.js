/**
 *  token.js
 *  @version: 1.0.0
 *  @author: trejocode
 *  @description: Proceso de cifrado de datos
 * 	@process: 2
*/

const crypto = require('crypto');

function getToken(data) {
    var cipher = crypto.createCipher('aes-256-cbc', 'best line cancun key');
    var encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function getDecode(token) {
    // console.log('token:',token)
    var decipher = crypto.createDecipher('aes-256-cbc', 'best line cancun key');
    var decrypted = decipher.update(token, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    // console.log('decrypted:',decrypted)
    return decrypted;
}

module.exports = { getToken, getDecode }