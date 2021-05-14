const logger = require("../utils/logger");
const { userAuthService, tokenService } = require('../service');
const _ = require("underscore");
const bcript = require("bcryptjs");
const envConfig = require("../config/envConfig");
const { v4: uuidv4 } = require("uuid");
/**
 * function for signUp
 * @param {Object} input 
 * @returns 
 */
async function signUp(input) {
    const userData = await userAuthService.getUserByEmail(input.email);
    logger.log(userData);
    logger.warn(!_.isEmpty(userData));
    if (!_.isEmpty(userData)) {
        throw { code: "user/user_exists" };
    }
     // Generate Salt
    const salt = bcript.genSaltSync(10);
    // Creating Hash Password
    const hashPassword = bcript.hashSync(input.password, salt);
    input.password = hashPassword;
    input.uid = uuidv4();
    let record = await userAuthService.createUser(input);
    let payload = { uid: input.uid, name: input.name, email: input.email };
    logger.info(payload,envConfig.jwt.secret.accessSecret,envConfig.jwt.secret.refreshSecret,envConfig.jwt.expiryTime.accessTokenExpiry,envConfig.jwt.expiryTime.refreshTokenExpiry)
    payload.auth = await tokenService.createAccessAndRefreshToken(payload,envConfig.jwt.secret.accessSecret,envConfig.jwt.secret.refreshSecret,envConfig.jwt.expiryTime.accessTokenExpiry,envConfig.jwt.expiryTime.refreshTokenExpiry);
    logger.debug(record.auth);
    return { data: payload };
}

module.exports = { signUp };