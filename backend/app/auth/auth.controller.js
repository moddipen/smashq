const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_SECRET_KEY;
const My = require("jm-ez-mysql");

exports.login = (req, res) => {
  const condition = "username = ? ";
  const values = [req.body.username];
  My.first("users", ["id, password"], condition, values)
    .then(object => {
      if (!object) {
        return res.send(makeError("Incorrect username or password !"));
      } else {
        if (!bcrypt.compareSync(req.body.password, object.password)) {
          return res.send(makeError("Incorrect username or password !"));
        } else {
          console.log(object);
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
    req.body.password = hash;
    My.insert("users", req.body).then(result => {
      My.insert("user_profiles", {
        user_id: result.insertId,
        description: ""
      }).then(result => {
        console.log("Profile inserted");
      });
      var replace_var = {
        username: req.body.username,
        link: process.env.SERVER_URL + "email/"
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
