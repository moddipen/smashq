"use strict";

var express = require("express");
var wallet = require("./wallet.controller");
var router = express.Router();

router.post("/wallet/coin/update", wallet.updateCoin);

module.exports = router;
