const logger = require("../utils/logger");
const { userAuthService, tokenService } = require('../service');
const _ = require("underscore");
const envConfig = require("../config/envConfig");
/**
 * Functino to signIn
 * @param {Object} input 
 */
async function signIn(input) {
    logger.log(input);
    const userData = await userAuthService.getUserByEmail(input.email);
    logger.log(userData);
    logger.warn(!_.isEmpty(userData));
    if (_.isEmpty(userData)) {
        throw { code: "user/does_not_exists" };
    }
    const name = userData[0].name;
    let payload = { uid: userData[0].uid, name, email: input.email };
    logger.info(payload,envConfig.jwt.secret.accessSecret,envConfig.jwt.secret.refreshSecret,envConfig.jwt.expiryTime.accessTokenExpiry,envConfig.jwt.expiryTime.refreshTokenExpiry)
    payload.auth = await tokenService.createAccessAndRefreshToken(payload,envConfig.jwt.secret.accessSecret,envConfig.jwt.secret.refreshSecret,envConfig.jwt.expiryTime.accessTokenExpiry,envConfig.jwt.expiryTime.refreshTokenExpiry);
    return { data: payload };
}

module.exports = { signIn };