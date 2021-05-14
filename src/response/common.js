/* eslint-disable no-useless-escape */
const errorConfig = require("../config/errorConfig");
const logger = require("../utils/logger");

function formatValidationErrors(errors) {
	let messageString = "";
	let code;
	logger.error(errors);
	let key =
		errors && errors.details && errors.details[0] ? errors.details[0] : null;
	if (key && key.message !== undefined && key.message !== undefined && key.message !== "") {
		const fieldError = `${ key.context.key }_${ key.type }`;
		switch (fieldError) {
			default:
				messageString = key.message.replace(/\".*\"/m, `${ key.context.key }`);
				break;
		}
		code = `${ key.context.label }`;
	} else {
		messageString = "Internal Server Error";
		code = 400;
	}
	return {
		message: messageString.charAt(0).toUpperCase() + messageString.slice(1),
		code: Number(code),
	};
}

function errorResponseOfSignUp(err) {
	let errorObj = {
		httpStatusCode: 400,
		status: {
			code: 400,
			message: "Internal Server Error"
		}
	}
	switch (err.code) {
		case "user/user_exists": {
			logger.debug("inside")
			errorObj.status.code = errorConfig.userAlreadyExist.code;
			errorObj.status.message = errorConfig.userAlreadyExist.description;
		}
			break
			
	}
	return errorObj;
}

function errorResponseOfSignIn(err) {
	let errorObj = {
		httpStatusCode: 400,
		status: {
			code: 400,
			message: "Internal Server Error"
		}
	}
	switch (err.code) {
		case "user/does_not_exists": {
			errorObj.status.code = errorConfig.userDoesNotExist.code;
			errorObj.status.message = errorConfig.userDoesNotExist.description;
		}
			break
			
	}
	return errorObj;
}

function errorResponseOfProduct(err) {
	let errorObj = {
		httpStatusCode: 400,
		status: {
			code: 400,
			message: "Internal Server Error"
		}
	}
	switch (err.code) {
		case "product/please_upload_product_image": {
			errorObj.status.code = errorConfig.uploadFile.code;
			errorObj.status.message = errorConfig.uploadFile.description;
		}
			break
		case "product/product_does_not_exists": {
			errorObj.status.code = errorConfig.productDoesNotExist.code;
			errorObj.status.message = errorConfig.productDoesNotExist.description;
		}
			break
			
	}
	return errorObj;
}
function errorResponseOfTokenValidator(err) {
	let errorObj = {
		httpStatusCode: 400,
		status: {
			code: 400,
			message: "Internal Server Error"
		}
	}
	switch (err.code) {
		case "accessToken/expired_token": {
			errorObj.status.code = errorConfig.expiredAccessToken.code;
			errorObj.status.message = errorConfig.expiredAccessToken.description;
		}
			break
		case "accessToken/invalid_token": {
			errorObj.status.code = errorConfig.invalidAccessToken.code;
			errorObj.status.message = errorConfig.invalidAccessToken.description;
		}
			break
		case "accessToken/require": {
			errorObj.status.code = errorConfig.accessTokenRequired.code;
			errorObj.status.message = errorConfig.accessTokenRequired.description;
		}
			break
			
	}
	return errorObj;
}
module.exports = {
  formatValidationErrors,
  errorResponseOfSignUp,
  errorResponseOfProduct,
  errorResponseOfSignIn,
  errorResponseOfTokenValidator,
};
