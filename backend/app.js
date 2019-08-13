var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors')
require('dotenv').config();

var app = express();
app.use(bodyParser.json());
app.use(cors());

// Connecting to the database
require('./config/database.js');

//Serves resources from public folder
app.use(express.static('statics')); 

// Require routes
require('./app/routes.js')(app);

// Include Helper Functions
require('./app/helper/common');

// connection port set
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port "+ process.env.PORT);
});