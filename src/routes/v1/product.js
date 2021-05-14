const logger = require('../../utils/logger');
const { productValidator } = require("../../validators");
const { common, apiResponse } = require('../../response');
const { productController } = require("../../controller");


async function getAllProduct(req, res) {
	try {
       
		logger.log("Inside SignUp function with request Body fhkdjlk;l");
		const result = await productController.getAllProduct();
		res.status(200).send(result);
	}
	catch (err) {
		logger.error("err", err);
		const errObj = common.errorResponseOfProduct(err);
		res.status(errObj.httpStatusCode).send({ status: errObj.status });
	}
}
async function getProductById(req, res) {
	try {
		const id = req.query.id;
		let result = await productController.getProductById(id);
		res.status(200).send(result);
	}
	catch (err) {
		logger.error("err", err);
		const errObj = common.errorResponseOfProduct(err);
		res.status(errObj.httpStatusCode).send({ status: errObj.status });
	}
}

async function createProduct(req, res) {
	try {
        const { body: input } = req;
        const files = req.files;
		const { error: validateError } = productValidator.validateBody(input);
		if (validateError) {
			return res.status(400).send(apiResponse.error(common.formatValidationErrors(validateError)));
		}
        if (!files || files.length == 0) {
            throw {code:"product/please_upload_product_image"}
        }
        await productController.createProduct(input,files);
		res.status(204).send();
	}
	catch (err) {
		logger.error("error in creating product", err);
		const errObj = common.errorResponseOfProduct(err);
		res.status(errObj.httpStatusCode).send({ status: errObj.status });
	}
}

async function updateProduct(req, res) {
	try {
		const { body: input } = req;
		logger.debug(input,"put method")
		const files = req.files;
		logger.debug(files, "put method");
		const { error: validateError } = productValidator.validateUpdateBody(input);
		console.log(validateError);
		if (validateError) {
			return res.status(400).send(apiResponse.error(common.formatValidationErrors(validateError)));
		}
        await productController.updateProduct(input,files);
		res.status(204).send("sadgjlk");
	}
	catch (err) {
		logger.error("err", err);
		const errObj = common.errorResponseOfProduct(err);
		res.status(errObj.httpStatusCode).send({ status: errObj.status });
	}
}
async function getProductByKeyWord(req, res) {
	try {
		const keyWord = req.query.keyWord;
		let result = await productController.getProductByKeyWord(keyWord);
		res.status(200).send(result);
	}
	catch (err) {
		logger.error("err", err);
		const errObj = common.errorResponseOfProduct(err);
		res.status(errObj.httpStatusCode).send({ status: errObj.status });
	}
}
module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  getProductByKeyWord,
};