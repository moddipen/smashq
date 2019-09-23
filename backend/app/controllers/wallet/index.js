"use strict";

var express = require("express");
var wallet = require("./wallet.controller");
var router = express.Router();

router.post("/wallet/coin/update", wallet.updateCoin);
router.get("/wallet/transactions", wallet.getTransactions);
router.post("/wallet/createSubscription", wallet.requiringSubscription);

module.exports = router;
