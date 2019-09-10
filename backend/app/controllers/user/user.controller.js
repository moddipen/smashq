const My = require("jm-ez-mysql");
const bcrypt = require("bcrypt-nodejs");

exports.getProfile = async (req, res) => {
  var id = req.user.id;
  My.query("select id, username, email from users where id = ? limit 1", [id])
    .then(result => {
      return res.send(
        makeSuccess("User loaded successfully.", { profiles: result[0] })
      );
    })
    .catch(err => {
      return res.send(makeError("Something went wrong !"));
    });
};

exports.logout = async (req, res) => {
  return res.send(makeSuccess("Logout successfully."));
};

exports.updateProfile = async (req, res) => {
  let data = req.body;
  if (data.username) {
    const condition = "username = ? AND id != ?";
    const values = [req.body.username, req.user.id];
    await My.first("users", ["id"], condition, values).then(async object => {
      if (object) {
        return res.send(makeError("Username already registered !"));
      } else {
        await My.update(
          "users",
          {
            username: data.username
          },
          "id = " + req.user.id
        )
          .then(result => {
            console.log("username updated !!");
          })
          .catch(err => {
            return res.send(makeError("Something went wrong !"));
          });
      }
    });
    await delete data.username;
  }
  if (Object.keys(data).length !== 0) {
    My.update("user_profiles", data, "user_id = " + req.user.id)
      .then(result => {
        return res.send(makeSuccess("Profile updated successfully."));
      })
      .catch(err => {
        return res.send(makeError("Something went wrong !"));
      });
  } else {
    return res.send(makeSuccess("Profile updated successfully."));
  }
};

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

exports.follows = async (req, res) => {
  My.first(
    "followers",
    ["id"],
    "user_id=" + req.user.id + " AND follow_user_id=" + req.body.user_id
  )
    .then(object => {
      if (object) {
        // Unfollow
        My.delete("followers", "id = " + object.id).then(() => {
          return res.send(makeSuccess("Unfollowed successfully."));
        });
      } else {
        // Follow
        My.insert("followers", {
          user_id: req.user.id,
          follow_user_id: req.body.user_id
        }).then(result => {
          return res.send(makeSuccess("Followed successfully."));
        });
      }
    })
    .catch(err => {
      return res.send(makeError("Something went wrong !"));
    });
};

exports.search = async (req, res) => {
  My.query("select id, username, email from users where username like ?", [
    `%${req.body.slug}%`
  ])
    .then(results => {
      return res.send(makeSuccess(""));
    })
    .catch(err => {
      return res.send(makeError("Something went wrong !"));
    });
};
