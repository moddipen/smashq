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
    "SELECT posts.path,posts.type,posts.unique_id,posts.user_id,posts.created_at,users.username,user_profiles.photo FROM posts left join users on posts.user_id=users.id left join user_profiles on users.id = user_profiles.user_id  WHERE posts.user_id != ?  order by posts.id desc"

  My.query(sql, [id])
    .then(async result => {
      if (result.length > 0) {
        for (var j = 0; j < result.length; j++) {
          await My.query(
            "select id from postlikes where user_id = ? and unique_id=?",
            [id, result[j].unique_id]
          ) //get post like status
            .then(async result3 => {
              if (Object.keys(result3).length === 0) {
                result[j].likeStatus = "0"
              } else {
                result[j].likeStatus = "1"
              }

              await My.query(
                "select count(*) as likeCount from postlikes where unique_id=? and user_id != ?",
                [result[j].unique_id, id]
              ) //get post like count
                .then(async result4 => {
                  result[j].likeCount = result4[0].likeCount
                })
            })
            .catch(e => {
              console.log("error45", e)
              return res.send(makeError(e))
            })
        }
      }
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

//for like / unlike posts
exports.likePosts = async (req, res) => {
  let data = req.body
  let id = req.user.id
  if (data && Object.keys(data).length > 0) {
    if (data.type === "like") {
      //insert data in postlike table (like)
      My.insert("postlikes", {
        unique_id: data.unique_id,
        user_id: id
      })
        .then(result => {
          let object = {
            unique_id: data.unique_id,
            status: "like"
          }
          return res.send(
            makeSuccess("Posts liked successfully .", { posts: object })
          )
        })
        .catch(e => {
          console.log("error44", e)
          return res.send(makeError(e))
        })
    } else {
      //delete data from postlike table (dislike)
      My.first(
        "postlikes",
        ["id"],
        "unique_id=" + data.unique_id,
        "user_id=" + id
      )
        .then(object5 => {
          if (object5) {
            My.delete("postlikes", "id = " + object5.id).then(() => {
              let object = {
                unique_id: data.unique_id,
                status: "dislike"
              }

              return res.send(
                makeSuccess("Post disliked successfully.", { posts: object })
              )
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

function existCheck(id, arr) {
  return arr.some(function(el) {
    return el.follow_user_id === id
  })
}

//for get users post like
exports.likeusers = async (req, res) => {
  let data = req.body
  let id = req.user.id
  if (data && Object.keys(data).length > 0) {
    console.log(data)

    let sql =
      "SELECT users.id,users.name,users.username,users.email,user_profiles.id as userprofile_id,user_profiles.description,user_profiles.website, user_profiles.photo, user_profiles.facebook,user_profiles.gender,user_profiles.phone,user_profiles.sas,user_profiles.instagram,user_profiles.snapchat,user_profiles.twitter,user_profiles.youtube,user_profiles.amazon from postlikes left join users on users.id=postlikes.user_id left join user_profiles on user_profiles.user_id=users.id where postlikes.unique_id = ? and postlikes.user_id != ?"
    My.query(sql, [data.unique_id, id])
      .then(async result => {
        if (result.length > 0) {
          for (var j = 0; j < result.length; j++) {
            await My.first(
              "user_settings",
              ["value"],
              "user_id=" + result[j].id + " AND name='sub_on_follow'"
            ).then(async results3 => {
              if (results3) {
                if (results3.value === "1") {
                  result[j].subOnFollow = results3.value
                } else {
                  result[j].subOnFollow = "0"
                }
              } else {
                result[j].subOnFollow = "0"
              }

              await My.query(
                "select followers.follow_user_id from followers left join users on users.id = followers.follow_user_id where followers.user_id=? and users.status=?",
                [id, 1]
              ).then(async results1 => {
                var exists = existCheck(result[j].id, results1)
                if (exists) {
                  result[j].follow_user_id = result[j].id
                } else {
                  result[j].follow_user_id = null
                }
              })
            })
          }

          return res.send(makeSuccess("", { users: result }))
        }
      })
      .catch(e => {
        console.log("error44", e)
        return res.send(makeError(e))
      })
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
