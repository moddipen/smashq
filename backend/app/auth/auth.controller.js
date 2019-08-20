const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_SECRET_KEY;
const My = require("jm-ez-mysql");
const uuidv1 = require("uuid/v1");
const { body } = require("express-validator");

exports.login = (req, res) => {
  const condition = "username = ? ";
  const values = [req.body.username];
  My.first("users", ["id, password, status"], condition, values)
    .then(object => {
      if (!object) {
        return res.send(makeError("Incorrect username or password !"));
      } else {
        if (!bcrypt.compareSync(req.body.password, object.password)) {
          return res.send(makeError("Incorrect username or password !"));
        } else {
          if (!object.status) {
            return res.send(makeError("Your account is not active !"));
          }
          jwt.sign(
            { id: object.id },
            privateKey,
            { expiresIn: "24h" },
            (err, token) => {
              var obj = JSON.parse(JSON.stringify(object));
              obj.accessToken = token;
              delete obj.password;
              return res.send(makeSuccess("User successfully logged in.", obj));
            }
          );
        }
      }
    })
    .catch(err => {
      return res.send(makeError("Incorrect username or password !"));
    });
};

exports.register = (req, res) => {
  try {
    var hash = bcrypt.hashSync(req.body.password);
    let token = uuidv1();
    req.body.password = hash;
    req.body.remember_token = token;
    My.insert("users", req.body).then(result => {
      My.insert("user_profiles", {
        user_id: result.insertId,
        description: ""
      }).then(result => {
        console.log("Profile inserted");
      });
      var replace_var = {
        username: req.body.username,
        link: process.env.SERVER_URL + "auth/verify-email/" + token
      };
      send_mail(
        "emailverification.html",
        replace_var,
        req.body.email,
        "Verify account"
      );
      return res.send(makeSuccess("Verification link sent to your email."));
    });
  } catch (err) {
    return res.send(makeError("Something went wrong !"));
  }
};

exports.forgotpassword = async (req, res) => {
  const condition = "email = ? ";
  const values = [req.body.email];
  My.first("users", ["id, username, email"], condition, values)
    .then(object => {
      if (!object) {
        return res.send(makeError("Enter valid email address !"));
      } else {
        var replace_var = {
          username: object.username,
          link: process.env.SERVER_URL + "passwordreset/" + object.id
        };
        send_mail(
          "forgopassword.html",
          replace_var,
          object.email,
          "Forgot Password"
        );
        return res.send(
          makeSuccess("Reset password link sent to your email address.")
        );
      }
    })
    .catch(err => {
      return res.send(makeError("Enter valid email address !"));
    });
};

exports.verifyEmail = async (req, res) => {
  const condition = "remember_token = ? ";
  const values = [req.params.token];
  My.first("users", ["id"], condition, values)
    .then(object => {
      if (!object) {
        return res.send(404);
      } else {
        let data = {
          remember_token: uuidv1(),
          status: 1
        };
        My.update("users", data, "id = " + object.id)
          .then(result => {
            res.redirect(process.env.CLIENT_URL);
          })
          .catch(err => {
            return res.send(404);
          });
      }
    })
    .catch(err => {
      console.log(err);
      return res.send(makeError("Enter valid email address !"));
    });
};

exports.validate = method => {
  switch (method) {
    case "register": {
      return [
        body("username", "Username is required").exists(),
        body("email", "Invalid email")
          .exists()
          .isEmail(),
        body("password", "Password is required").exists()
      ];
    }
    case "login": {
      return [
        body("username", "Username is required").exists(),
        body("password", "Password is required").exists()
      ];
    }
    case "forgotPassword": {
      return [
        body("email", "Invalid email")
          .exists()
          .isEmail()
      ];
    }
  }
};
