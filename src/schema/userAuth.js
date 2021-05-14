const mongoose = require('mongoose');
const collectionName = require("../config/envConfig").mongoDB.collection;
const userSchema = new mongoose.Schema({
    uid: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        min: 6,
        type: String,
        max: 255,
    },
    createAtDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(collectionName.userAuth, userSchema);