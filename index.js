const APP = require("./src/app");
const LOGGER = require("./src/utils/logger");

const PORT = process.env.PORT || 8080;

APP.listen(PORT, LOGGER.log(`Server is running on ${PORT}`));
