"use strict"

var Auth = require("./auth/auth.service")

module.exports = app => {
  // common route include
  app.use("/api/query", Auth.isAuthenticated, require("./controllers/common"))

  // auth route include
  app.use("/auth", require("./auth"))

  // Upload route include
  app.use("/image", require("./controllers/upload"))

  // user route include
  app.use("/api", Auth.isAuthenticated, require("./controllers/user"))

  // wallet route include
  app.use("/api", Auth.isAuthenticated, require("./controllers/wallet"))

  // post route include
  app.use("/api", Auth.isAuthenticated, require("./controllers/post"))
}
