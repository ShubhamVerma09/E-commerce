const config = {
    dev: {
        mongoDB: {
            dbUrl:process.env.DB_URL || "mongodb://localhost:27017/productAPI"
        },
        jwt: {
            secret: {
                accessSecret: "rgjh76u2whjk98oj4rdrfg8t762",
                refreshSecret: "67yuh32uijn3209ip3ftvg8yg3i2"
            },
            expiryTime: {
                accessTokenExpiry: "10 days",
                refreshTokenExpiry:"20 days"  
            }
        }
    },
    stg: {
        mongoDB: {
            dbUrl:process.env.DB_URL || "mongodb://localhost:27017/productAPI"
        },
        jwt: {
            secret: {
                accessSecret: "rgdjh76u2whjk98oj4rdrfg8t762",
                refreshSecret: "67dyuh32uijn3209ip3ftvg8yg3i2"
            },
            expiryTime: {
                accessTokenExpiry: "10 days",
                refreshTokenExpiry:"20 days"  
            }
        }
    },
    prod: {
        mongoDB: {
            dbUrl:process.env.DB_URL || "mongodb://localhost:27017/productAPI"
        },
        jwt: {
            secret: {
                accessSecret: "rwgfvjh76u2whjk98oj4rdrfg8t762",
                refreshSecret: "67dsfyuh32uijn3209ip3ftvg8yg3i2"
            },
            expiryTime: {
                accessTokenExpiry: "10 days",
                refreshTokenExpiry:"20 days"  
            }
        }
    }
};
let envConfig = config[process.env.stage || "dev"];
envConfig.mongoDB.collection = {
    userAuth: "userauths",
    productIteams: "productiteams",
    images:"images"
};

module.exports = envConfig;