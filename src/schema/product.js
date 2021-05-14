const mongoose = require('mongoose');
const collectionName = require("../config/envConfig").mongoDB.collection;
const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    colors: {
        required: true,
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now
    },
    images: [String],
    product_Id: {
        require: true,
        type:String
    }
});

module.exports = mongoose.model(collectionName.productIteams, userSchema);