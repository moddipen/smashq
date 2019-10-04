const My = require("jm-ez-mysql")
const bcrypt = require("bcrypt-nodejs")
const isBase64 = require("is-base64")
const util = require("util")
const jwt = require("jsonwebtoken")
const { body } = require("express-validator")

//for getting auth user posts
exports.getPosts = async (req, res) => {
  let id = req.user.id
  let sql =
    "SELECT path,unique_id,created_at FROM posts WHERE user_id = ? order by id desc"

  My.query(sql, [id])
    .then(result => {
      return res.send(makeSuccess("", { posts: result }))
    })
    .catch(e => {
      console.log("error44", e)
      return res.send(makeError(e))
    })
}

//for upload posts
exports.uploadPosts = async (req, res) => {
  let data = req.body
  let id = req.user.id
  let post = {}
  let unique = generateOTP(6)
  if (data && Object.keys(data).length > 0) {
    for (var j = 0; j < data.length; j++) {
      let path = "data:" + data[j].type + ";base64," + data[j].val
      try {
        let filepath = await uploadFileFromBase64(path, "posts", data[j].type)
        My.insert("posts", {
          path: filepath,
          user_id: id,
          unique_id: unique
        })
          .then(result => {
            return res.send(makeSuccess("Posts uploaded successfully ."))
          })
          .catch(e => {
            delete filepath
            console.log("error44", e)
            return res.send(makeError(e))
          })
      } catch (e) {
        await delete filepath
      }
    }
  } else {
    return res.send(makeError("Something went wrong !"))
  }
}
