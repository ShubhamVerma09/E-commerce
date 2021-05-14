const mongoose = require("mongoose");
const logger = require("../utils/logger");
const mongoDBConfig = require("../config/envConfig").mongoDB;
// connect to mongoose
mongoose.connect(
  mongoDBConfig.dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => logger.log("Connect to Mongodb")
);
const db = mongoose.connection;
db.on("error", (err) => {
    logger.error("error while connecting mongodb",err)
});
db.once("open", function callback() {
  logger.log("Database connection to MongoDB opened.");
});
