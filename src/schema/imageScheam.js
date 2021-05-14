const mongoose = require("mongoose");
const dbCollectionName = require("../config/envConfig").mongoDB.collection;

let imageSchema = new mongoose.Schema({
  name: String,
  image_id: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = new mongoose.model(dbCollectionName.images, imageSchema);