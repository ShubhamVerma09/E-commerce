const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

/**
 * Function to create token 
 * @param {Object} payload 
 * @param {String} accessSecret 
 * @param {String} refreshSecret 
 * @param {String} accessTokenExpiresIn 
 * @param {String} refreshTokenExpiresIn 
 * @returns Object which have auth token deatais
 */
async function createAccessAndRefreshToken(payload, accessSecret, refreshSecret, accessTokenExpiresIn, refreshTokenExpiresIn) {
	try {
		const access_token = jwt.sign(payload, accessSecret, { expiresIn: accessTokenExpiresIn, subject: `Access token for Product api` });
		const refresh_token = jwt.sign(payload, refreshSecret, { expiresIn: refreshTokenExpiresIn, subject: `Refresh token for Product api` });
		const accessTokenDecoded = jwt.decode(access_token);
		return ({
			accessToken: access_token,
			refreshToken: refresh_token,
			expirationTime: accessTokenDecoded['exp']
		});
	} catch (error) {
        throw {code: "token/error_while_creating_token"}
	}
}

/**
 * Function to verify token
 * @param {String} token 
 * @param {String} secret 
 * @returns Object of decoded token
 */
async function verifyToken(token, secret) {
	try {
		let decoded = jwt.verify(token, secret);
		logger.log(`decoded ${ JSON.stringify(decoded) }`);
		return decoded;
	} catch (error) {
		switch (error.message) {
			case 'jwt expired':
				throw { code: "accessToken/expired_token" };
			case 'jwt invalid':
			case 'jwt malformed':
			case 'jwt not active':
			case 'jwt signature is required':
			case 'invalid signature':
			case 'auth/user-not-found':
			case 'invalid token':
				throw {code:"accessToken/invalid_token"}
			default:
				throw { code: "Internal_server_error" };
		}
	}
}
module.exports = {
    createAccessAndRefreshToken,
    verifyToken
};