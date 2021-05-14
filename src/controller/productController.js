const logger = require("../utils/logger");
const { productService, imageService } = require('../service');
const _ = require("underscore");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
/**
 * function to get all product 
 */
async function getAllProduct() {
    const allProduct = await productService.getAllProduct();
    if (_.isEmpty(allProduct)) {
      throw { code: "product/product_does_not_exists" };
    }
    return { data: allProduct };
}
/**
 * function to get product by id
 * @param {String} productId 
 */
async function getProductById(productId) {
    logger.log("product id",productId)
    const productRecord = await productService.getProductById(productId);
    if (_.isEmpty(productRecord)) {
      throw { code: "product/product_does_not_exists" };
    }
    return { data: productRecord };
}
/**
 * function to get product by keyword
 * @param {String} keyWord  
 */
async function getProductByKeyWord(keyWord) {
    logger.log("product id", keyWord);
    const productRecord = await productService.getProductByKeyWord(keyWord);
    if (_.isEmpty(productRecord)) {
      throw { code: "product/product_does_not_exists" };
    }
    return { data: productRecord };
}
/**
 * Function to create product
 * @param {Object} input 
 * @param {Array<File>} files 
 * @returns 
 */
async function createProduct(input, files) {
    const fileCount = files.length;
    let imagesArray = [];
    let imagesId = [];
    for (let i = 0; i < fileCount; i++) {
        let fileContent = fs.readFileSync(files[i].path);
        fileContent = fileContent.toString("base64");
        const image_id = uuidv4();
        let imageObj = {
            name: files[i].originalname,
            image_id: image_id,
            img: {
                contentType: files[i].mimetype,
                data: new Buffer(fileContent, "base64")
            }
        };
        fs.unlink(files[i].path, logger.log);
        imagesArray.push(imageObj);
        imagesId.push(image_id);
    }
    input.colors = input.colors.split(",");
    input.product_Id = uuidv4();
    input.images = imagesId;
    await Promise.all([productService.createProduct(input), imageService.saveMultipleImages(imagesArray)]);
    return
}
/**
 * Function to update The product
 * @param {Object} input 
 * @param {Array<File>} files 
 * @returns 
 */
async function updateProduct(input, files) {
    let imagesArray = [];
    let images = [];
    if (files && files.length>0) {
        const fileCount = files.length;
        for (let i = 0; i < fileCount; i++){
            logger.debug(files[i]);
            let fileContent = fs.readFileSync(files[i].path)
            fileContent=fileContent.toString("base64");
            let image_id = uuidv4();
            let imageObj = {
              name: files[i].originalname,
              image_id,
              img: {
                contentType: files[i].mimetype,
                data: new Buffer(fileContent, "base64"),
              },
            };
            fs.unlink(files[i].path,logger.log);
            imagesArray.push(imageObj);
            images.push(image_id);
        }        
    }
    
    if (input.colors) input.colors = input.colors.split(",");
    const query = { product_Id: input.product_Id };
    logger.info(input)
    delete input.product_Id;
    let promiseAllArray = [productService.updateProductById(query, input)];
    // if (images.length > 0) {
        //     input.images = images;
        
        // }
    if (imagesArray.length>0) {
        promiseAllArray.push(productService.updateProductById(query, { $addToSet: { "images": { $each: images } } }));
        promiseAllArray.push(imageService.saveMultipleImages(imagesArray));
    }
    if (input.deleteImageId) {
        input.deleteImageId = input.deleteImageId.split(",");
        promiseAllArray.push(productService.updateProductById(query, { $pullAll: { images: input.deleteImageId } }));
    }
    const updatedRecord = await Promise.all(promiseAllArray);
    return { data: updatedRecord };
}
module.exports = {
    getAllProduct,
    getProductById,
    getProductByKeyWord,
    updateProduct,
    createProduct,
};