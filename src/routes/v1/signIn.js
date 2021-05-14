const logger = require('../../utils/logger');
const { signInValidator } = require("../../validators");
const { common, apiResponse } = require('../../response');
const {  signInController } = require("../../controller");
async function signIn(req, res) {
	try {
		const { body: input } = req;
		logger.log("Inside SignIn function with request Body ", input);
		const { error: validateError } = signInValidator.validateBody(input);
		if (validateError) {
			logger.error("Error in Client validation of SignIn request body", validateError);
			return res.status(400).send(apiResponse.error(common.formatValidationErrors(validateError)));
		}
		const result = await signInController.signIn(input);
		res.status(200).send(apiResponse.success("", result));
	}
	catch (err) {
		logger.error("err", err);
		const errObj = common.errorResponseOfSignIn(err);
		res.status(errObj.httpStatusCode).send({ status: errObj.status });
	}
}

module.exports = {
  signIn,
};