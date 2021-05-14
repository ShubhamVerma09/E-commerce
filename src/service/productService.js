const { productSchema } = require("../schema");

const logger = require("../utils/logger");

async function getProductById(product_Id) {
  try {
    return await productSchema.aggregate([
      { $match: { product_Id } },
      {$limit:1},
      {
        $lookup: {
          from: "images",
          localField: "images",
          foreignField: "image_id",
          as: "product_info",
        },
      },
      { $unwind: "$product_info" },
      {
        $group: {
          _id: "$product_Id",
          name: { $first: "$name" },
          colors: { $first: "$colors" },
          price: { $first: "$price" },
          date: { $first: "$date" },
          product_Id: { $first: "$product_Id" },
          images1: {
            $push: {
              name: "$product_info.name",
              image_id: "$product_info.image_id",
            },
          },
        },
      },
    ]);
  } catch (err) {
    logger.error("Error while getting data", err);
    throw { code: "db/issue" };
  }
}
async function getAllProduct() {
  try {
    return await productSchema.aggregate([
      {
        $lookup: {
          from: "images",
          localField: "images",
          foreignField: "image_id",
          as: "product_info",
        },
      },
      { $unwind: "$product_info" },
      {
        $group: {
          _id: "$product_Id",
          name: { $first: "$name" },
          colors: { $first: "$colors" },
          price: { $first: "$price" },
          date: { $first: "$date" },
          product_Id: { $first: "$product_Id" },
          images1: {
            $push: {
              name: "$product_info.name",
              image_id: "$product_info.image_id",
            },
          },
        },
      },
    ]);
  } catch (err) {
    logger.error("Error while getting data", err);
    throw { code: "db/issue" };
  }
}
async function createProduct(productData) {
    try {
        const productRecord = new productSchema(productData);
        return await productRecord.save();
    } catch (err) {
        logger.error("Error while getting data", err);
        throw {code:"db/issue"}
    }
}
async function updateProductById(query,productData) {
    try {
      return await productSchema.findOneAndUpdate(query, productData);
    } catch (err) {
        logger.error("Error while getting data", err);
        throw {code:"db/issue"}
    }
}
async function getProductByKeyWord(keyWord) {
  try {
    return await productSchema.find({ name: { $regex: keyWord ,  $options : 'i'} });
  } catch (err) {
    logger.error("Error while getting data", err);
    throw { code: "db/issue" };
  }
}
module.exports = { createProduct, getProductById, updateProductById, getAllProduct, getProductByKeyWord };