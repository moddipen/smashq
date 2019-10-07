const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

var app = express();
app.use(bodyParser.json());
app.use(cors());

// Connecting to the database
require("./config/database.js");

//Serves resources from public folder
app.use(express.static("statics"));
app.use("/public", express.static(path.join(__dirname, "public")));

// Require routes
require("./app/routes.js")(app);

// Require socket
require("./app/socket.js");

// Include Helper Functions
require("./app/helper/common");

// connection port set
app.listen(process.env.PORT, () => {
  console.log("Server is listening on port " + process.env.PORT);
});
