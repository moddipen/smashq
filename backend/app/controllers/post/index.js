"use strict"

var express = require("express")
var posts = require("./post.controller")
var router = express.Router()

router.post("/posts/upload", posts.uploadPosts)
router.get("/posts", posts.getPosts)

module.exports = router
