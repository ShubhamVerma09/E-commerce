const JOI = require("joi");
const errorUtilities = require("../config/errorConfig");

function validateBody(params) {
	const schema = JOI.object({
		email: JOI.string().email().required().label(errorUtilities.validationError.email),
		password: JOI.string().alphanum().required().label(errorUtilities.validationError.password)
	});
	return schema.validate(params);
}

module.exports = { validateBody };