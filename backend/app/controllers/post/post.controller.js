const My = require("jm-ez-mysql")
const bcrypt = require("bcrypt-nodejs")
const isBase64 = require("is-base64")
const util = require("util")
const jwt = require("jsonwebtoken")
const { body } = require("express-validator")

//for getting all users posts
exports.getPosts = async (req, res) => {
  let id = req.user.id
  let sql =
    "SELECT path,type,unique_id,created_at FROM posts WHERE user_id != ? order by id desc"

  My.query(sql, [id])
    .then(result => {
      console.log("result", result)
      return res.send(makeSuccess("", { posts: result }))
    })
    .catch(e => {
      console.log("error44", e)
      return res.send(makeError(e))
    })
}

//for getting auth user posts
exports.getAuthPosts = async (req, res) => {
  let id = req.user.id
  let sql =
    "SELECT path,type,unique_id,created_at FROM posts WHERE user_id = ? order by id desc"

  My.query(sql, [id])
    .then(result => {
      return res.send(makeSuccess("", { authposts: result }))
    })
    .catch(e => {
      console.log("error44", e)
      return res.send(makeError(e))
    })
}

//for upload posts
exports.likePosts = async (req, res) => {
  let data = req.body
  let id = req.user.id
  console.log("id", id)
  console.log("dtata", data)
  if (data && Object.keys(data).length > 0) {
    if (data.type === "like") {
      //insert data in postlike table (like)
      My.insert("postlikes", {
        unique_id: unique_id
      })
        .then(result => {
          return res.send(makeSuccess("Posts liked successfully ."))
        })
        .catch(e => {
          console.log("error44", e)
          return res.send(makeError(e))
        })
    } else {
      //delete data from postlike table (dislike)
      My.first("postlikes", ["id"], "unique_id=" + data.unique_id)
        .then(object5 => {
          if (object5) {
            My.delete("postlikes", "id = " + object5.id).then(() => {
              return res.send(makeSuccess("Disliked successfully."))
            })
          } else {
            return res.send(makeError("Something went wrong !"))
          }
        })
        .catch(err => {
          console.log("e1", err)
          return res.send(makeError("Something went wrong !"))
        })
    }
  } else {
    return res.send(makeError("Something went wrong !"))
  }
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
          unique_id: unique,
          type: data[j].type
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
