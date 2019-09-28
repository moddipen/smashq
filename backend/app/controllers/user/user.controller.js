const My = require("jm-ez-mysql")
const bcrypt = require("bcrypt-nodejs")
const isBase64 = require("is-base64")
const RocketGate = require("rocketgate")
const util = require("util")
const jwt = require("jsonwebtoken")
const uuidv1 = require("uuid/v1")
const { body } = require("express-validator")
const privateKey = process.env.JWT_SECRET_KEY

const paymentClient = new RocketGate.gateway({
  MERCHANT_ID: process.env.MERCHANT_ID,
  MERCHANT_PASSWORD: process.env.MERCHANT_PASSWORD,
  testMode: true
})

//for get login profile
exports.getProfile = async (req, res) => {
  var id = req.user.id

  My.query("select * from users where id = ? limit 1", [id]) //get username and email
    .then(result => {
      My.query(
        "select id AS userprofile_id,description,website,motto, photo,gender,phone,sas, facebook,instagram,snapchat,twitter,youtube,amazon from user_profiles where user_id = ? limit 1",
        [id]
      ) //get user profile details
        .then(result1 => {
          My.query("select coins from user_coins where user_id = ?", [id]) //get users coins
            .then(result2 => {
              if (Object.keys(result2).length === 0) {
                result1[0].coins = 0
              } else {
                result1[0].coins = result2[0].coins
              }

              My.query(
                "select value from user_settings where user_id = ? and name=?",
                [id, "sub_on_follow"]
              ) //get users coins
                .then(result3 => {
                  if (Object.keys(result3).length === 0) {
                    result1[0].subOnFollow = 0
                  } else {
                    result1[0].subOnFollow = result3[0].value
                  }

                  My.query(
                    "select value from user_settings where user_id = ? and name=?",
                    [id, "amount"]
                  ) //get users coins
                    .then(result4 => {
                      if (Object.keys(result4).length === 0) {
                        result1[0].subamount = 0
                      } else {
                        result1[0].subamount = result4[0].value
                      }

                      var obj = Object.assign({}, result[0], result1[0])
                      return res.send(makeSuccess("", { profiles: obj }))
                    })
                    .catch(err => {
                      return res.send(makeError("Something went wrong !"))
                    })
                })
                .catch(err => {
                  return res.send(makeError("Something went wrong !"))
                })
            })
            .catch(err => {
              return res.send(makeError("Something went wrong !"))
            })
        })
        .catch(err => {
          return res.send(makeError("Something went wrong !"))
        })
    })
    .catch(err => {
      return res.send(makeError("Something went wrong !"))
    })
}

//for logout
exports.logout = async (req, res) => {
  return res.send(makeSuccess("Logout successfully."))
}

//for update profile
exports.updateProfile = async (req, res) => {
  let data = req.body
  if (data.username) {
    const condition = "username = ? AND id != ?"
    const values = [req.body.username, req.user.id]
    await My.first("users", ["id"], condition, values).then(async object => {
      if (object) {
        return res.send(makeError("Username already registered !"))
      } else {
        const condition1 = "email = ? AND id != ?"
        const values1 = [req.body.email, req.user.id]
        await My.first("users", ["id"], condition1, values1).then(
          async object => {
            if (object) {
              return res.send(makeError("Email already registered !"))
            } else {
              await My.update(
                "users",
                {
                  username: data.username,
                  email: data.email,
                  name: data.name
                },
                "id = " + req.user.id
              )
                .then(result => {
                  console.log("username updated !!")
                })
                .catch(err => {
                  console.log(err)
                  return res.send(makeError("Something went wrong !"))
                })
            }
          }
        )
      }
    })
    await delete data.username
    await delete data.email
    await delete data.name
  }
  if (Object.keys(data).length !== 0) {
    if (data.photo && isBase64(data.photo, { mimeRequired: true })) {
      try {
        data.photo = await uploadImageFromBase64(data.photo, "profile")
      } catch (e) {
        await delete data.photo
      }
    }

    await My.update("user_profiles", data, "user_id = " + req.user.id)
      .then(result => {
        My.query("select * from users where id = ? limit 1", [req.user.id])
          .then(result => {
            My.query(
              "select id AS userprofile_id,description,website, photo, facebook,gender,phone,sas,instagram,snapchat,twitter,youtube,amazon from user_profiles where user_id = ? limit 1",
              [req.user.id]
            )
              .then(result1 => {
                var obj = Object.assign({}, result[0], result1[0])
                return res.send(
                  makeSuccess("Profile updated successfully.", {
                    profiles: obj
                  })
                )
              })
              .catch(err => {
                return res.send(makeError("Something went wrong !"))
              })
          })
          .catch(err => {
            return res.send(makeError("Something went wrong !"))
          })
      })
      .catch(err => {
        return res.send(makeError("Something went wrong !"))
      })
  } else {
    My.query("select * from users where id = ? limit 1", [id])
      .then(result => {
        My.query(
          "select id AS userprofile_id,motto,description,website, photo, facebook,instagram,gender,phone,sas,snapchat,twitter,youtube,amazon from user_profiles where user_id = ? limit 1",
          [req.user.id]
        )
          .then(result1 => {
            var obj = Object.assign({}, result[0], result1[0])
            return res.send(
              makeSuccess("Profile updated successfully.", { profiles: obj })
            )
          })
          .catch(err => {
            return res.send(makeError("Something went wrong !"))
          })
      })
      .catch(err => {
        return res.send(makeError("Something went wrong !"))
      })
  }
}

//for update social media
exports.updateSocialMedia = async (req, res) => {
  let data = req.body
  if (Object.keys(data).length !== 0) {
    My.update("user_profiles", data, "user_id = " + req.user.id)
      .then(result => {
        My.query(
          "select * from users left join user_profiles on users.id = user_profiles.user_id where user_id = ? limit 1",
          [req.user.id]
        )
          .then(result1 => {
            My.query("select * from users where id = ? limit 1", [req.user.id])
              .then(result => {
                My.query(
                  "select id AS userprofile_id,motto,description,website, photo, facebook,instagram,snapchat,twitter,youtube,gender,phone,sas,amazon from user_profiles where user_id = ? limit 1",
                  [req.user.id]
                )
                  .then(result1 => {
                    var obj = Object.assign({}, result[0], result1[0])
                    return res.send(
                      makeSuccess("Social media updated successfully.", {
                        profiles: obj
                      })
                    )
                  })
                  .catch(err => {
                    return res.send(makeError("Something went wrong !"))
                  })
              })
              .catch(err => {
                return res.send(makeError("Something went wrong !"))
              })
          })
          .catch(err => {
            return res.send(makeError("Something went wrong !"))
          })
      })
      .catch(err => {
        console.log(err)
        return res.send(makeError("Something went wrong !"))
      })
  } else {
    My.query("select * from users where id = ? limit 1", [req.user.id])
      .then(result => {
        My.query(
          "select id AS userprofile_id,motto,description,website, photo, facebook,instagram,snapchat,twitter,youtube,amazon from user_profiles where user_id = ? limit 1",
          [req.user.id]
        )
          .then(result1 => {
            var obj = Object.assign({}, result[0], result1[0])
            return res.send(
              makeSuccess("Social media updated successfully.", {
                profiles: obj
              })
            )
          })
          .catch(err => {
            return res.send(makeError("Something went wrong !"))
          })
      })
      .catch(err => {
        return res.send(makeError("Something went wrong !"))
      })
  }
}

//for user settings
exports.updateSettings = async (req, res) => {
  let data = req.body
  let id = req.user.id
  console.log("data", data)
  if (Object.keys(data).length !== 0) {
    My.first(
      "user_settings",
      ["id"],
      "user_id=" + req.user.id + " AND name='sub_on_follow'"
    )
      .then(object => {
        if (object) {
          //update sub_on_follow
          My.update(
            "user_settings",
            {
              value: data.sub_on_follow
            },
            "id = " + object.id
          )
            .then(result2 => {
              //update amount
              My.first(
                "user_settings",
                ["id"],
                "user_id=" + req.user.id + " AND name='amount'"
              )
                .then(object2 => {
                  My.update(
                    "user_settings",
                    {
                      value: data.amount
                    },
                    "id = " + object2.id
                  )
                    .then(result2 => {
                      return res.send(
                        makeSuccess("Settings updated successfully.", {
                          profiles: data
                        })
                      )
                    })
                    .catch(err => {
                      console.log(err)
                      return res.send(makeError("Something went wrong !"))
                    })
                })
                .catch(err => {
                  console.log(err)
                  return res.send(makeError("Something went wrong !"))
                })
            })
            .catch(err => {
              console.log(err)
              return res.send(makeError("Something went wrong !"))
            })
        } else {
          //insert
          My.insert("user_settings", {
            user_id: req.user.id,
            name: "sub_on_follow",
            value: data.sub_on_follow
          })
            .then(result => {
              My.insert("user_settings", {
                user_id: req.user.id,
                name: "amount",
                value: data.amount
              })
                .then(result1 => {
                  return res.send(
                    makeSuccess("Settings updated successfully.", {
                      profiles: data
                    })
                  )
                })
                .catch(e => {
                  console.log("error441", e)
                  return res.send(makeError(e))
                })
            })
            .catch(e => {
              console.log("error44", e)
              return res.send(makeError(e))
            })
        }
      })
      .catch(err => {
        console.log("e1", err)
        return res.send(makeError("Something went wrong !"))
      })
  }
}

//for change password
exports.changePassword = async (req, res) => {
  const checkPassword = bcrypt.compareSync(
    req.body.old_password,
    req.user.password
  )
  if (checkPassword) {
    const password = bcrypt.hashSync(req.body.password)
    My.update(
      "users",
      {
        password: password
      },
      "id = " + req.user.id
    )
      .then(result => {
        return res.send(makeSuccess("Password changed successfully."))
      })
      .catch(err => {
        return res.send(makeError("Something went wrong !"))
      })
    return res.send(makeSuccess("Password changed successfully."))
  } else {
    return res.send(makeError("Old password wrong !"))
  }
}

//for follow / unfollow
exports.follows = async (req, res) => {
  let data = req.body
  let id = req.user.id
  let amount = 0
  My.first(
    "followers",
    ["id"],
    "user_id=" + req.user.id + " AND follow_user_id=" + req.body.user_id
  )
    .then(object => {
      if (object) {
        let cred = {
          id: req.body.user_id,
          status: "unfollow"
        }
        // Unfollow
        My.delete("followers", "id = " + object.id).then(() => {
          return res.send(
            makeSuccess("Unfollowed successfully.", { users: cred })
          )
        })
      } else {
        // Follow // subscription
        My.first(
          "user_settings",
          ["value"],
          "name='sub_on_follow' AND user_id=" + req.body.user_id
        )
          .then(object4 => {
            let subNeeded = 0
            if (object4) {
              if (object4.value === "1") {
                subNeeded = 1
                My.first(
                  "user_settings",
                  ["value"],
                  "name='amount' AND user_id=" + req.body.user_id
                )
                  .then(object5 => {
                    //subscription needed
                    let creditCard = {
                      creditCardNumber: data.card,
                      expirationMonth: data.month,
                      expirationYear: data.year,
                      cvv: data.cvv
                    }
                    let prospect = {
                      customerFirstName: req.user.name,
                      customerEmail: req.user.email
                    }

                    let plan = {
                      amount: object5.value,
                      iterationCount: "5",
                      periodLength: 6,
                      periodUnit: "months",
                      startingDate: new Date(Date.now() + 24 * 3600 * 7 * 1000)
                    }

                    var other = {
                      merchantCustomerID: Date.now() + ".JSTest",
                      merchantInvoiceID: Date.now() + ".Test"
                    }

                    paymentClient
                      .createSubscription(creditCard, prospect, plan, other)
                      .then(success => {
                        My.first(
                          "users",
                          ["username"],
                          "id=" + req.body.user_id
                        )
                          .then(object => {
                            My.insert("transactions", {
                              user_id: req.user.id,
                              transaction_id: success.subscriptionId,
                              coins: plan.amount,
                              amount: plan.amount,
                              description: "Follow to " + object.username
                            })
                              .then(result => {
                                My.insert("followers", {
                                  user_id: req.user.id,
                                  follow_user_id: req.body.user_id
                                }).then(result => {
                                  let cred = {
                                    id: req.body.user_id,
                                    status: "follow",
                                    subOnFollow: 1
                                  }

                                  var replace_var = {
                                    name: req.user.name,
                                    amount: plan.amount,
                                    user: object.username
                                  }
                                  send_mail(
                                    "followpaiduser.html",
                                    replace_var,
                                    req.user.email,
                                    "Subscription success"
                                  )

                                  return res.send(
                                    makeSuccess("Followed successfully.", {
                                      users: cred
                                    })
                                  )
                                })
                              })
                              .catch(e => {
                                console.log("error44", e)
                                return res.send(makeError(e))
                              })
                          })
                          .catch(e => {
                            console.log("error55", e)
                            return res.send(makeError(e))
                          })
                      })
                      .catch(e => {
                        console.log("error", e)
                        return res.send(makeError(e))
                      })
                  })
                  .catch(err => {
                    console.log("e1", err)
                    return res.send(makeError("Something went wrong !"))
                  })
              } else {
                //no subscription needed
                My.insert("followers", {
                  user_id: req.user.id,
                  follow_user_id: req.body.user_id
                })
                  .then(result => {
                    let cred = {
                      id: req.body.user_id,
                      status: "follow",
                      subOnFollow: 0
                    }
                    return res.send(
                      makeSuccess("Followed successfully.", { users: cred })
                    )
                  })
                  .catch(e => {
                    console.log("error44", e)
                    return res.send(makeError(e))
                  })
              }
            } else {
              //no subscription needed
              My.insert("followers", {
                user_id: req.user.id,
                follow_user_id: req.body.user_id
              })
                .then(result => {
                  let cred = {
                    id: req.body.user_id,
                    status: "follow",
                    subOnFollow: 0
                  }
                  return res.send(
                    makeSuccess("Followed successfully.", { users: cred })
                  )
                })
                .catch(e => {
                  console.log("error44", e)
                  return res.send(makeError(e))
                })
            }
          })
          .catch(err => {
            console.log("e1", err)
            return res.send(makeError("Something went wrong !"))
          })
      }
    })
    .catch(err => {
      console.log("e1", err)
      return res.send(makeError("Something went wrong !"))
    })
}

//for search of user
exports.search = async (req, res) => {
  My.query(
    "select users.id, users.username, users.email,user_profiles.photo,user_profiles.motto,user_profiles.description from users left join user_profiles on users.id = user_profiles.user_id where users.username like ? and users.id != ? and users.status=?",
    [`%${req.body.search}%`, req.user.id, 1]
  )
    .then(results => {
      My.query(
        "select followers.follow_user_id from followers left join users on users.id = followers.follow_user_id where followers.user_id=? and users.status=?",
        [req.user.id, 1]
      )
        .then(async results1 => {
          if (results.length > 0) {
            for (var j = 0; j < results.length; j++) {
              var exists = existCheck(results[j].id, results1)
              if (exists) {
                results[j].follow_user_id = results[j].id
              } else {
                results[j].follow_user_id = null
              }

              await My.first(
                "user_settings",
                ["value"],
                "user_id=" + results[j].id + " AND name='sub_on_follow'"
              ).then(results3 => {
                if (results3) {
                  if (results3.value === "1") {
                    results[j].subOnFollow = results3.value
                  } else {
                    results[j].subOnFollow = "0"
                  }
                } else {
                  results[j].subOnFollow = "0"
                }
              })
            }
          }
          return res.send(makeSuccess("", { users: results }))
        })
        .catch(err => {
          console.log("err2", err)
          return res.send(makeError("Something went wrong !"))
        })
    })
    .catch(err => {
      console.log("error", err)
      return res.send(makeError("Something went wrong !"))
    })
}

function existCheck(id, arr) {
  return arr.some(function(el) {
    return el.follow_user_id === id
  })
}

//for get all users
exports.getAllUsers = async (req, res) => {
  My.query(
    "select users.id, users.username, users.email,user_profiles.photo,user_profiles.motto,user_profiles.description from users left join user_profiles on users.id = user_profiles.user_id where users.id!=? and users.status=?",
    [req.user.id, 1]
  )
    .then(results => {
      My.query(
        "select followers.follow_user_id from followers left join users on users.id = followers.follow_user_id where followers.user_id=? and users.status=?",
        [req.user.id, 1]
      )
        .then(async results1 => {
          if (results.length > 0) {
            for (var j = 0; j < results.length; j++) {
              var exists = existCheck(results[j].id, results1)
              if (exists) {
                results[j].follow_user_id = results[j].id
              } else {
                results[j].follow_user_id = null
              }

              //following count
              await My.query(
                "select count(id) as following from followers where user_id = ?",
                [results[j].id]
              ).then(async results11 => {
                results[j].following = results11[0].following

                //followers count
                await My.query(
                  "select count(id) as followers from followers where follow_user_id = ?",
                  [results[j].id]
                ).then(async results12 => {
                  results[j].followers = results12[0].followers
                  await My.first(
                    "user_settings",
                    ["value"],
                    "user_id=" + results[j].id + " AND name='sub_on_follow'"
                  ).then(results3 => {
                    if (results3) {
                      if (results3.value === "1") {
                        results[j].subOnFollow = results3.value
                      } else {
                        results[j].subOnFollow = "0"
                      }
                    } else {
                      results[j].subOnFollow = "0"
                    }
                  })
                })
              })
            }
          }
          return res.send(makeSuccess("", { users: results }))
        })
        .catch(err => {
          console.log("err2", err)
          return res.send(makeError("Something went wrong !"))
        })
    })
    .catch(err => {
      console.log("err1", err)
      return res.send(makeError("Something went wrong !"))
    })
}

//get user Profile
exports.findOne = async (req, res) => {
  var id = req.params.Id
  My.query(
    "select users.id, users.username,users.name, users.email,user_profiles.description,user_profiles.motto,user_profiles.website,user_profiles.photo,user_coins.coins from users left join user_profiles on users.id = user_profiles.user_id left join user_coins on user_coins.user_id = users.id where users.id = ?",
    [id]
  )
    .then(async result => {
      //following count
      My.query(
        "select count(id) as following from followers where user_id = ?",
        [id]
      )
        .then(results => {
          //followers count
          My.query(
            "select count(id) as followers from followers where follow_user_id = ?",
            [id]
          )
            .then(results1 => {
              //check follow and unfollow status
              My.query(
                "select count(id) as followStatus from followers where follow_user_id = ? and user_id=?",
                [id, req.user.id]
              )
                .then(async results2 => {
                  if (results2[0].followStatus > 0) {
                    results[0].followUserId = id
                  } else {
                    results[0].followUserId = null
                  }

                  await My.first(
                    "user_settings",
                    ["value"],
                    "user_id=" + id + " AND name='sub_on_follow'"
                  ).then(results3 => {
                    if (results3) {
                      if (results3.value === "1") {
                        results[0].subOnFollow = results3.value
                      } else {
                        results[0].subOnFollow = "0"
                      }
                    } else {
                      results[0].subOnFollow = "0"
                    }
                  })

                  var obj = Object.assign(
                    {},
                    result[0],
                    results[0],
                    results1[0]
                  )
                  console.log(obj)
                  return res.send(makeSuccess("", { users: obj }))
                })
                .catch(err => {
                  return res.send(makeError("Something went wrong !"))
                })
            })
            .catch(err => {
              return res.send(makeError("Something went wrong !"))
            })
        })
        .catch(err => {
          return res.send(makeError("Something went wrong !"))
        })
    })
    .catch(err => {
      console.log(err)
      return res.send(makeError("Something went wrong !"))
    })
}
