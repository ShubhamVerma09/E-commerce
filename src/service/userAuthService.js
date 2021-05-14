const { userAuthSchema } = require("../schema");
const logger = require("../utils/logger");
/**
 * function to find user by email
 * @param {String} email 
 * @returns Array of all account present in collection
 */
async function getUserByEmail(email) {
    try {
       return await userAuthSchema.find({ email })
    } catch (err) {
        logger.error("Error while getting data", err);
        throw {code:"db/issue"}
    }
}
/**
 * 
 * @param {UserAuth} userData, object of  
 * @returns 
 */
async function createUser(userData) {
    try {
        const userRecord = new userAuthSchema(userData);
        return await userRecord.save();
    } catch (err) {
        logger.error("Error while getting data", err);
        throw {code:"db/issue"}
    }
}
module.exports = { getUserByEmail, createUser };