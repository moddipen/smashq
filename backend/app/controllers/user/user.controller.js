const My = require("jm-ez-mysql");
const bcrypt = require("bcrypt-nodejs");
const isBase64 = require("is-base64");

//for get login profile
exports.getProfile = async (req, res) => {
  var id = req.user.id;

  My.query("select * from users where id = ? limit 1", [id]) //get username and email
    .then(result => {
      My.query(
        "select id AS userprofile_id,description,website, photo,gender,phone,sas, facebook,instagram,snapchat,twitter,youtube,amazon from user_profiles where user_id = ? limit 1",
        [id]
      ) //get user profile details
        .then(result1 => {
          My.query("select coins from user_coins where user_id = ?", [id]) //get users coins
            .then(result2 => {
              if (Object.keys(result2).length === 0) {
                result1[0].coins = 0;
              } else {
                result1[0].coins = result2[0].coins;
              }
              var obj = Object.assign({}, result[0], result1[0]);
              return res.send(makeSuccess("", { profiles: obj }));
            })
            .catch(err => {
              return res.send(makeError("Something went wrong !"));
            });
        })
        .catch(err => {
          return res.send(makeError("Something went wrong !"));
        });
    })
    .catch(err => {
      return res.send(makeError("Something went wrong !"));
    });
};

//for logout
exports.logout = async (req, res) => {
  return res.send(makeSuccess("Logout successfully."));
};

//for update profile
exports.updateProfile = async (req, res) => {
  let data = req.body;
  if (data.username) {
    const condition = "username = ? AND id != ?";
    const values = [req.body.username, req.user.id];
    await My.first("users", ["id"], condition, values).then(async object => {
      if (object) {
        return res.send(makeError("Username already registered !"));
      } else {
        const condition1 = "email = ? AND id != ?";
        const values1 = [req.body.email, req.user.id];
        await My.first("users", ["id"], condition1, values1).then(
          async object => {
            if (object) {
              return res.send(makeError("Email already registered !"));
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
                  console.log("username updated !!");
                })
                .catch(err => {
                  console.log(err);
                  return res.send(makeError("Something went wrong !"));
                });
            }
          }
        );
      }
    });
    await delete data.username;
    await delete data.email;
    await delete data.name;
  }
  if (Object.keys(data).length !== 0) {
    if (data.photo && isBase64(data.photo, { mimeRequired: true })) {
      try {
        data.photo = await uploadImageFromBase64(data.photo, "profile");
      } catch (e) {
        await delete data.photo;
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
                var obj = Object.assign({}, result[0], result1[0]);
                return res.send(
                  makeSuccess("Profile updated successfully.", {
                    profiles: obj
                  })
                );
              })
              .catch(err => {
                return res.send(makeError("Something went wrong !"));
              });
          })
          .catch(err => {
            return res.send(makeError("Something went wrong !"));
          });
      })
      .catch(err => {
        return res.send(makeError("Something went wrong !"));
      });
  } else {
    My.query("select * from users where id = ? limit 1", [id])
      .then(result => {
        My.query(
          "select id AS userprofile_id,description,website, photo, facebook,instagram,gender,phone,sas,snapchat,twitter,youtube,amazon from user_profiles where user_id = ? limit 1",
          [req.user.id]
        )
          .then(result1 => {
            var obj = Object.assign({}, result[0], result1[0]);
            return res.send(
              makeSuccess("Profile updated successfully.", { profiles: obj })
            );
          })
          .catch(err => {
            return res.send(makeError("Something went wrong !"));
          });
      })
      .catch(err => {
        return res.send(makeError("Something went wrong !"));
      });
  }
};

//for update social media
exports.updateSocialMedia = async (req, res) => {
  let data = req.body;
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
                  "select id AS userprofile_id,description,website, photo, facebook,instagram,snapchat,twitter,youtube,gender,phone,sas,amazon from user_profiles where user_id = ? limit 1",
                  [req.user.id]
                )
                  .then(result1 => {
                    var obj = Object.assign({}, result[0], result1[0]);
                    return res.send(
                      makeSuccess("Social media updated successfully.", {
                        profiles: obj
                      })
                    );
                  })
                  .catch(err => {
                    return res.send(makeError("Something went wrong !"));
                  });
              })
              .catch(err => {
                return res.send(makeError("Something went wrong !"));
              });
          })
          .catch(err => {
            return res.send(makeError("Something went wrong !"));
          });
      })
      .catch(err => {
        console.log(err);
        return res.send(makeError("Something went wrong !"));
      });
  } else {
    My.query("select * from users where id = ? limit 1", [req.user.id])
      .then(result => {
        My.query(
          "select id AS userprofile_id,description,website, photo, facebook,instagram,snapchat,twitter,youtube,amazon from user_profiles where user_id = ? limit 1",
          [req.user.id]
        )
          .then(result1 => {
            var obj = Object.assign({}, result[0], result1[0]);
            return res.send(
              makeSuccess("Social media updated successfully.", {
                profiles: obj
              })
            );
          })
          .catch(err => {
            return res.send(makeError("Something went wrong !"));
          });
      })
      .catch(err => {
        return res.send(makeError("Something went wrong !"));
      });
  }
};

//for change password
exports.changePassword = async (req, res) => {
  const checkPassword = bcrypt.compareSync(
    req.body.old_password,
    req.user.password
  );
  if (checkPassword) {
    const password = bcrypt.hashSync(req.body.password);
    My.update(
      "users",
      {
        password: password
      },
      "id = " + req.user.id
    )
      .then(result => {
        return res.send(makeSuccess("Password changed successfully."));
      })
      .catch(err => {
        return res.send(makeError("Something went wrong !"));
      });
    return res.send(makeSuccess("Password changed successfully."));
  } else {
    return res.send(makeError("Old password wrong !"));
  }
};

//for follow / unfollow
exports.follows = async (req, res) => {
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
        };
        // Unfollow
        My.delete("followers", "id = " + object.id).then(() => {
          return res.send(
            makeSuccess("Unfollowed successfully.", { users: cred })
          );
        });
      } else {
        // Follow
        My.insert("followers", {
          user_id: req.user.id,
          follow_user_id: req.body.user_id
        }).then(result => {
          let cred = {
            id: req.body.user_id,
            status: "follow"
          };
          return res.send(
            makeSuccess("Followed successfully.", { users: cred })
          );
        });
      }
    })
    .catch(err => {
      return res.send(makeError("Something went wrong !"));
    });
};

//for search of user
exports.search = async (req, res) => {
  My.query(
    "select users.id, users.username, users.email,user_profiles.photo from users left join user_profiles on users.id = user_profiles.user_id where users.username like ? and users.id != ?",
    [`%${req.body.search}%`, req.user.id]
  )
    .then(results => {
      return res.send(makeSuccess("", { users: results }));
    })
    .catch(err => {
      return res.send(makeError("Something went wrong !"));
    });
};

//for get all users
exports.getAllUsers = async (req, res) => {
  My.query(
    "select users.id, users.username, users.email,user_profiles.photo,user_profiles.motto,user_profiles.description,followers.follow_user_id from users left join user_profiles on users.id = user_profiles.user_id left join followers on users.id = followers.follow_user_id where users.id!=?",
    [req.user.id]
  )
    .then(results => {
      return res.send(makeSuccess("", { users: results }));
    })
    .catch(err => {
      return res.send(makeError("Something went wrong !"));
    });
};

//get user Profile
exports.findOne = async (req, res) => {
  var id = req.params.Id;
  My.query(
    "select users.id, users.username,users.name, users.email,user_profiles.description,user_profiles.motto,user_profiles.website,user_profiles.photo,user_coins.coins from users left join user_profiles on users.id = user_profiles.user_id left join user_coins on user_coins.user_id = users.id where users.id = ?",
    [id]
  )
    .then(result => {
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
                .then(results2 => {
                  if (results2[0].followStatus > 0) {
                    results[0].followUserId = id;
                  } else {
                    results[0].followUserId = null;
                  }

                  var obj = Object.assign(
                    {},
                    result[0],
                    results[0],
                    results1[0]
                  );
                  return res.send(makeSuccess("", { users: obj }));
                })
                .catch(err => {
                  return res.send(makeError("Something went wrong !"));
                });
            })
            .catch(err => {
              return res.send(makeError("Something went wrong !"));
            });
        })
        .catch(err => {
          return res.send(makeError("Something went wrong !"));
        });
    })
    .catch(err => {
      console.log(err);
      return res.send(makeError("Something went wrong !"));
    });
};
