const bcrypt = require("bcrypt-nodejs")
const jwt = require("jsonwebtoken")
const My = require("jm-ez-mysql")
const uuidv1 = require("uuid/v1")
const { body } = require("express-validator")
const privateKey = process.env.JWT_SECRET_KEY
const RocketGate = require("rocketgate")

const paymentClient = new RocketGate.gateway({
  MERCHANT_ID: process.env.MERCHANT_ID,
  MERCHANT_PASSWORD: process.env.MERCHANT_PASSWORD,
  testMode: true
})

exports.login = (req, res) => {
  const condition = "username = ? "
  const values = [req.body.username]
  // let sql =
  //   "SELECT users.id,users.name,users.username,users.email,users.password,users.status,users.remember_token,user_profiles.photo,user_coins.coins,user_profiles.website,user_profiles.motto,user_profiles.description,user_profiles.phone,user_profiles.gender,user_profiles.sas,user_profiles.facebook,user_profiles.instagram,user_profiles.snapchat,user_profiles.twitter,user_profiles.youtube,user_profiles.amazone FROM users left join user_profiles on users.id=user_profiles.user_id left join user_coins on user_coins.user_id = users.id WHERE username = ? limit 1"

  let sql =
    "SELECT users.id,users.name,users.username,users.email,users.password,users.status,users.remember_token,user_profiles.photo,user_coins.coins,user_profiles.website,user_profiles.motto,user_profiles.description,user_profiles.phone,user_profiles.gender,user_profiles.sas FROM users left join user_profiles on users.id=user_profiles.user_id left join user_coins on user_coins.user_id = users.id WHERE username = ? limit 1"
  My.query(sql, [req.body.username])
    .then(object => {
      if (!object) {
        return res.send(makeError("Incorrect username or password !"))
      } else {
        if (!bcrypt.compareSync(req.body.password, object[0].password)) {
          return res.send(makeError("Incorrect username or password !"))
        } else {
          if (!object[0].status) {
            var obj = JSON.parse(JSON.stringify(object[0]))
            return res.send(makeSuccess("Your account is not active !", obj))
          }
          jwt.sign(
            { id: object[0].id },
            privateKey,
            { expiresIn: "24h" },
            (err, token) => {
              var obj = JSON.parse(JSON.stringify(object[0]))
              obj.accessToken = token
              delete obj.password

              return res.send(makeSuccess("User successfully logged in.", obj))
            }
          )
        }
      }
    })
    .catch(err => {
      return res.send(0("Incorrect username or password !"))
    })
}

exports.register = (req, res) => {
  try {
    const condition = "username = ? "
    const values = [req.body.username]
    My.first("users", ["id"], condition, values).then(object => {
      if (object) {
        return res.send(makeError("Username already registered !"))
      }
      const condition = "email = ? "
      const values = [req.body.email]
      My.first("users", ["id"], condition, values).then(object => {
        if (object) {
          return res.send(makeError("Email already registered !"))
        }
        var hash = bcrypt.hashSync(req.body.password)
        let token = uuidv1()
        req.body.password = hash
        req.body.remember_token = token
        My.insert("users", req.body).then(result => {
          My.insert("user_profiles", {
            user_id: result.insertId,
            description: ""
          }).then(result => {})
          var replace_var = {
            username: req.body.username,
            link: process.env.SERVER_URL + "auth/verify-email/" + token
          }
          send_mail(
            "emailverification.html",
            replace_var,
            req.body.email,
            "Verify account"
          )
          return res.send(makeSuccess("Verification link sent to your email."))
        })
      })
    })
  } catch (err) {
    return res.send(makeError("Something went wrong !"))
  }
}

function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789"
  let OTP = ""
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)]
  }
  return OTP
}

exports.forgotPassword = async (req, res) => {
  const condition = "email = ? "
  const values = [req.body.email]

  const conf_code = generateOTP()

  My.first("users", ["id, username, email, remember_token"], condition, values)
    .then(object => {
      if (!object) {
        return res.send(makeError("Enter valid email address !"))
      } else {
        var replace_var = {
          username: object.username,
          link: conf_code
        }
        let token = uuidv1()
        let data = {
          code: conf_code,
          remember_token: token
        }
        My.update("users", data, "id = " + object.id)
          .then(result => {
            send_mail(
              "forgopassword.html",
              replace_var,
              object.email,
              "Verify Email"
            )
            let data1 = {
              email: object.email
            }
            return res.send(
              makeSuccess(
                "Confirmation code sent to your email address.",
                data1
              )
            )
          })
          .catch(err => {
            return res.send(makeError("Something went wrong !"))
          })
      }
    })
    .catch(err => {
      return res.send(makeError("Enter valid email address !"))
    })
}

exports.resendEmail = async (req, res) => {
  const condition = "email = ? "
  const values = [req.body.email]

  const conf_code = generateOTP()

  My.first("users", ["id, username, email, remember_token"], condition, values)
    .then(object => {
      if (!object) {
        return res.send(makeError("Enter valid email address !"))
      } else {
        var replace_var = {
          username: object.username,
          link: conf_code
        }
        let data = {
          code: conf_code
        }
        My.update("users", data, "id = " + object.id)
          .then(result => {
            send_mail(
              "forgopassword.html",
              replace_var,
              object.email,
              "Verify Email"
            )
            let data1 = {
              email: object.email
            }
            return res.send(
              makeSuccess(
                "Confirmation code sent to your email address.",
                data1
              )
            )
          })
          .catch(err => {
            return res.send(makeError("Something went wrong !"))
          })
      }
    })
    .catch(err => {
      return res.send(makeError("Enter valid email address !"))
    })
}

exports.verifyCode = async (req, res) => {
  const condition = "code = ? "
  const values = [req.body.code]
  My.first("users", ["id", "remember_token"], condition, values)
    .then(object => {
      if (!object) {
        return res.send(makeError("Enter valid confirmation code !"))
      } else {
        let data1 = {
          code: ""
        }

        My.update("users", data1, "id = " + object.id)
          .then(result => {
            let data = {
              id: object.id,
              remember_token: object.remember_token
            }
            return res.send(makeSuccess("Code verify successfully !", data))
          })
          .catch(err => {
            return res.send(makeError("Something went wrong !"))
          })
      }
    })
    .catch(err => {
      return res.send(makeError("Enter valid confirmation code !"))
    })
}

exports.resendLink = async (req, res) => {
  const condition = "username = ? "
  const values = [req.body.username]
  My.first(
    "users",
    ["id", "remember_token", "username", "email"],
    condition,
    values
  )
    .then(object => {
      if (!object) {
        return res.send(makeError("Something went wrong. Please try again !"))
      } else {
        var replace_var = {
          username: object.username,
          link:
            process.env.SERVER_URL +
            "auth/verify-email/" +
            object.remember_token
        }
        send_mail(
          "emailverification.html",
          replace_var,
          object.email,
          "Verify account"
        )
        return res.send(makeSuccess("Verification link sent to your email."))
      }
    })
    .catch(err => {
      console.log(err)
      return res.send(makeError("Something went wrong. Please try again !"))
    })
}

exports.verifyEmail = async (req, res) => {
  const condition = "remember_token = ? "
  const values = [req.params.token]
  My.first("users", ["id"], condition, values)
    .then(object => {
      if (!object) {
        return res.sendStatus(404)
      } else {
        let data = {
          remember_token: uuidv1(),
          status: 1
        }
        My.update("users", data, "id = " + object.id)
          .then(result => {
            res.redirect(process.env.CLIENT_URL)
          })
          .catch(err => {
            return res.sendStatus(404)
          })
      }
    })
    .catch(err => {
      return res.send(makeError("Enter valid email address !"))
    })
}

exports.resetPassword = async (req, res) => {
  const condition = "remember_token = ? "
  const values = [req.body.token]
  My.first("users", ["id"], condition, values)
    .then(object => {
      if (!object) {
        return res.send(makeError("User not found !"))
      } else {
        let data = {
          remember_token: uuidv1(),
          password: bcrypt.hashSync(req.body.password)
        }
        My.update("users", data, "id = " + object.id)
          .then(result => {
            return res.send(makeSuccess("Password reseted successfully."))
          })
          .catch(err => {
            return res.send(makeError("Something went wrong !"))
          })
      }
    })
    .catch(err => {
      return res.send(makeError("Something went wrong !"))
    })
}

exports.validate = method => {
  switch (method) {
    case "register": {
      return [
        body("username", "Username is required").exists(),
        body("email", "Invalid email")
          .exists()
          .isEmail(),
        body("password", "Password is required").exists()
      ]
    }
    case "login": {
      return [
        body("username", "Username is required").exists(),
        body("password", "Password is required").exists()
      ]
    }
    case "forgotPassword": {
      return [
        body("email", "Invalid email")
          .exists()
          .isEmail()
      ]
    }
  }
}

exports.subscriptions = (req, res) => {
  let creditCard = {
    creditCardNumber: "4111111111111111",
    expirationMonth: "12",
    expirationYear: "2020",
    cvv: "123"
  }

  let prospect = {
    customerFirstName: "johnd",
    customerEmail: "johnd@yopmail.com"
  }

  let plan = {
    amount: "10",
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
      console.log("success", success)
    })
    .catch(e => console.log("error", e))
}
