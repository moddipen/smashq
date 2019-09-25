"use strict"

var express = require("express")
var auth = require("./auth.controller")
var router = express.Router()

router.post("/login", auth.validate("login"), auth.login)
router.post("/register", auth.validate("register"), auth.register)
router.post(
  "/forgot-password",
  auth.validate("forgotPassword"),
  auth.forgotPassword
)
router.get("/verify-email/:token", auth.verifyEmail)
router.post("/reset-password", auth.resetPassword)
router.post("/verify-code", auth.verifyCode)
router.post("/resend-email", auth.resendEmail)
router.post("/resend-link", auth.resendLink)
// router.post('/changePassword', auth.changePassword);
// router.get('/users/:Id', auth.findOne);
// router.put('/auth/:Id', auth.update);
// router.delete('/auth/:Id', auth.delete);
router.get("/subscriptions", auth.subscriptions)

module.exports = router
