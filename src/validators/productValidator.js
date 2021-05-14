const JOI = require("joi");
const errorUtilities = require("../config/errorConfig");

function validateBody(params) {
	const schema = JOI.object({
		price: JOI.number().required().label(errorUtilities.validationError.price),
        name: JOI.string().required().label(errorUtilities.validationError.name),
        colors: JOI.string().required().label(errorUtilities.validationError.colors)
	});
	return schema.validate(params);
}


function validateUpdateBody(params) {
    const schema = JOI.object({
        product_Id: JOI.string().alphanum().required().label(errorUtilities.validationError.product_Id),
		price: JOI.number().optional().label(errorUtilities.validationError.price),
        name: JOI.string().optional().label(errorUtilities.validationError.name),
		colors: JOI.string().optional().label(errorUtilities.validationError.colors),
		deleteImageId: JOI.string().optional().label(errorUtilities.validationError.deleteImageId)
	});
	return schema.validate(params);
}
module.exports = { validateBody, validateUpdateBody };