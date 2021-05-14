module.exports = {
  userAlreadyExist: {
    description: "User alredy exist with this mobile number.",
    code: 2001,
  },
  userDoesNotExist: { description: "User does not exist", code: 2002 },
  uploadFile: {
    description: "Please Upload images of product.",
    code: 1804,
  },
  productDoesNotExist: { description: "Product does not exist", code: 2003 },
  expiredAccessToken: {
    code: 2004,
    description: "Expired access token",
  },
  invalidAccessToken: { description: "Invalid token", code: 2005 },
  accessTokenRequired: {
    code: 2006,
    description: "Access token required.",
  },
  validationError: {
    email: "1801",
    password: "1802",
    name: "1803",
    colors: "1805",
    price: "1806",
    product_Id: "1807",
    deleteImageId:"1808",
  }
};
