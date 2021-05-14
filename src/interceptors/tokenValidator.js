const { tokenService } = require("../service");
const envConfig = require("../config/envConfig");
const logger = require("../utils/logger");
const { common } = require("../response");
async function validateToken(req,res,next) {
    try {
        const headers =req.headers;
        if (!headers.accesstoken) {
            console.error(`tokenvalidator()::Access token not available in header`);
            throw { code:"accessToken/require"};
        }
        await tokenService.verifyToken(headers.accesstoken,envConfig.jwt.secret.accessSecret);
        next();
    } catch (err) {
        logger.error(err);
        const errorObj = common.errorResponseOfTokenValidator(err);
        res.status(errorObj.httpStatusCode).send({ status: errorObj.status });
    }
}
module.exports = { validateToken };