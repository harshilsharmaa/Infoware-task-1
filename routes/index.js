const { adminRoutes } = require("../api/admin");
const {productRoutes} = require("../api/product");
const {orderRoutes} = require("../api/order");
const {userRoutes} = require("../api/user");

const appRoot = require("app-root-path");
const expressSwaggerGenerator = require("express-swagger-generator");

const options = {
  swaggerDefinition: {
    info: {
      description: "Shopping Cart API",
      title: "Shopping Cart API",
      version: "1.0.0",
    },
    host: process.env.DOMAIL_URL,
    basePath: "/api",
    produces: ["application/json"],
    schemes: ["https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
      },
      API_KEY: {
        type: "apiKey",
        in: "header",
        name: "Auth-Token",
      },
    },
  },
  basedir: `${appRoot}`,
  files: ["./api/**/*.routes.js"],
};

const initialize = (app) => {
  const expressSwagger = expressSwaggerGenerator(app);

  app.use("/api/admin", adminRoutes);
  app.use("/api/product", productRoutes);
  app.use("/api/order", orderRoutes);
  app.use("/api/user", userRoutes);
  

  expressSwagger(options);
};

module.exports = { initialize };