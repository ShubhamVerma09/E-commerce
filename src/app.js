const EXPRESS = require('express');
const { signUpRouter,signInRouter, productRouter } = require("./routes/v1/index");
require("./connection/mongoDBConnection");
const uploadFiles = require('./interceptors/multer');
const { validateToken } = require("./interceptors/tokenValidator");

const APP = EXPRESS();

APP.disable("x-powered-by");
APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: false }));

const APP_ROUTER = EXPRESS.Router();

APP_ROUTER.post("/signUp", signUpRouter.signUp);
APP_ROUTER.post("/signIn", signInRouter.signIn);
APP_ROUTER.get("/products", validateToken, productRouter.getAllProduct);
APP_ROUTER.post("/product",validateToken, uploadFiles, productRouter.createProduct);
APP_ROUTER.get("/product", validateToken, productRouter.getProductById);
APP_ROUTER.get("/product/Keyword",validateToken, productRouter.getProductByKeyWord);
APP_ROUTER.put("/product", validateToken, uploadFiles, productRouter.updateProduct);

APP.use("/v1", APP_ROUTER);

module.exports = APP;
