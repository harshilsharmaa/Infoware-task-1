let path = require("path");
let NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === "LOCAL") {
  require("dotenv").config({ path: path.join(process.cwd(), ".env.local") });
} else if (NODE_ENV === "DEVELOPMENT") {
  require("dotenv").config({
    path: path.join(process.cwd(), ".env.development"),
  });
} else if (NODE_ENV === "TEST") {
  require("dotenv").config({ path: path.join(process.cwd(), ".env.test") });
} else if (NODE_ENV === "PRODUCTION") {
  require("dotenv").config({
    path: path.join(process.cwd(), ".env.production"),
  });
} else {
  require("dotenv").config({ path: path.join(process.cwd(), ".env.local") });
}

module.exports = {
  [NODE_ENV]: {
    JWT_SECRET : "hdfkh786tuajk4ydsb0#fvDOwqe",
  },
};