const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../upload`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const message = `${file.originalname} is invalid. Only accept png/jpg.`;
      return callback(message, null);
    }

    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

const uploadFiles = multer({ storage: storage }).array("productImage", 10);
module.exports = uploadFiles;