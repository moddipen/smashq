"use strict"

var express = require("express")
var posts = require("./post.controller")
var router = express.Router()

router.post("/posts/upload", posts.uploadPosts)
router.get("/posts", posts.getPosts)
router.get("/auth/posts", posts.getAuthPosts)
router.post("/post/like", posts.likePosts)
router.post("/post/likeusers", posts.likeusers)

module.exports = router
