"use strict";

var express = require("express");
var users = require("./user.controller");
var router = express.Router();

router.get("/users", users.getProfile);
router.delete("/users/logout", users.logout);
router.post("/users/update", users.updateProfile);
router.post("/users/social/update", users.updateSocialMedia);
router.post("/users/change-password", users.changePassword);
router.post("/users/follows", users.follows);
router.post("/users/search", users.search);
router.get("/users/lists", users.getAllUsers);
// router.get('/users', users.findAll);
// router.get('/users/:Id', users.findOne);
// router.put('/users/:Id', users.update);
// router.delete('/users/:Id', users.delete);

module.exports = router;
