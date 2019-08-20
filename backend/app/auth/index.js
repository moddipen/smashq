"use strict";

var express = require("express");
var auth = require("./auth.controller");
var router = express.Router();

router.post("/login", auth.validate("login"), auth.login);
router.post("/register", auth.validate("register"), auth.register);
router.post(
  "/forgotpassword",
  auth.validate("forgotPassword"),
  auth.forgotpassword
);
router.get("/verify-email/:token", auth.verifyEmail);
// router.post('/updatepassword', auth.updatePassword);
// router.post('/changePassword', auth.changePassword);
// router.get('/users/:Id', auth.findOne);
// router.put('/auth/:Id', auth.update);
// router.delete('/auth/:Id', auth.delete);

module.exports = router;
