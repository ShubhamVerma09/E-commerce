'use strict'
const logger = require('../utils/logger');
module.exports = {
    success,
    error
}
function success(message = null, data = null, code = 200) {
    let outputData = data;
    const status = {
        code: code,
        message: message
    };
    if (!message) status.message = 'OK';
    if (typeof message === 'object') {
        status.message = 'OK';
        outputData = message;
	}
	logger.info(outputData)
    return { ...outputData };
}

function error(message = null, code = 400) {
    const status = {
        code: code,
        message: message
    };
    if (message.code)
        status.code = message.code; 
    if (message.message)
        status.message = message.message; 
    if (!message)
        status.message = 'ERROR';   

    return {
        status
    };
}