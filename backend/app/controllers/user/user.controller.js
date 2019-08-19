const My = require("jm-ez-mysql");
const bcrypt = require("bcrypt-nodejs");

exports.getProfile = async (req, res) => {
  var id = req.user.id;
  My.query("select id, username, email from users where id = ? limit 1", [id])
    .then(result => {
      return res.send(makeSuccess("User loaded !", { profiles: result[0] }));
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
        return res.send(send_response(null, true, "Something went wrong !"));
      });
    delete data.username;
  }
  if (!empty(data)) {
    My.update("user_profiles", data, "user_id = " + req.user.id)
      .then(result => {
        return res.send(
          send_response(null, false, "Profile updated successfully")
        );
      })
      .catch(err => {
        return res.send(send_response(null, true, "Something went wrong !"));
      });
  } else {
    return res.send(send_response(null, false, "Profile updated successfully"));
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
        return res.send(
          send_response(null, true, "Password changed successfully")
        );
      })
      .catch(err => {
        return res.send(send_response(null, true, "Something went wrong !"));
      });
    return res.send(
      send_response(null, false, "Password updated successfully")
    );
  } else {
    res.send(send_response(null, true, "Old password wrong."));
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
          return res.send(send_response(null, false, "Unfollowed !"));
        });
      } else {
        // Follow
        My.insert("followers", {
          user_id: req.user.id,
          follow_user_id: req.body.user_id
        }).then(result => {
          return res.send(send_response(null, false, "Followed !"));
        });
      }
    })
    .catch(err => {
      return res.send(send_response(null, true, "Something went wrong !"));
    });
};

exports.search = async (req, res) => {
  My.query("select id, username, email from users where username like ?", [
    `%${req.body.slug}%`
  ])
    .then(results => {
      return res.send(send_response(results, false, ""));
    })
    .catch(err => {
      return res.send(send_response(null, true, "Something went wrong !"));
    });
};
