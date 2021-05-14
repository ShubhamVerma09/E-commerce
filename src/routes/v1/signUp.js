const logger = require('../../utils/logger');
const { signUpValidator } = require("../../validators");
const { common, apiResponse } = require('../../response');
const { signUpController } = require("../../controller");
async function signUp(req, res) {
	try {
		const { body: input } = req;
		logger.log("Inside SignUp function with request Body ", input);
		const { error: validateError } = signUpValidator.validateBody(input);
		if (validateError) {
			logger.error("Error in validation of SignUp",validateError);
			return res.status(400).send(apiResponse.error(common.formatValidationErrors(validateError)));
		}
		const result = await signUpController.signUp(input);
		res.status(200).send(apiResponse.success("", result));
	}
	catch (err) {
		logger.error("err", err);
		const errObj = common.errorResponseOfSignUp(err);
		res.status(errObj.httpStatusCode).send({ status: errObj.status });
	}
}

module.exports = { signUp };
