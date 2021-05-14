const {imageSchema }= require("../schema");
const logger=require('../utils/logger');

async function saveImage(imageData) {
  try {
    const imageObj = new imageSchema(imageData);
    return await imageObj.save();
  } catch (err) {
    logger.error("Error while getting data", err);
    throw { code: "db/issue" };
  }
}
async function saveMultipleImages(imagelist) {
    try {
        console.log(imageSchema);
        return await imageSchema.collection.insert(imagelist);
  } catch (err) {
    logger.error("Error while getting data", err);
    throw { code: "db/issue" };
  }
}
async function deleteMultipleImages(query) {
  try {
    console.log(query);
    return await imageSchema.collection.deleteMany(query);
  } catch (err) {
    logger.error("Error while getting data", err);
    throw { code: "db/issue" };
  }
}
module.exports = { saveImage, saveMultipleImages, deleteMultipleImages };
