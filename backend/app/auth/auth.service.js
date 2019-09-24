"use strict"

var jwt = require("jsonwebtoken")
var privateKey = process.env.JWT_SECRET_KEY
const My = require("jm-ez-mysql")

function isAuthenticated(req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"] // Express headers are auto converted to lowercase
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length)
  }
  if (token) {
    jwt.verify(token, privateKey, async (err, decoded) => {
      if (err) {
        return res.send(send_response(null, true, "Token is not valid"))
      } else {
        req.decoded = decoded
        const { id } = decoded
        const model = "users"
        const params = ["id, name, username, email, password"]
        const condition = "id = ?"
        const values = [id]
        try {
          const userInfo = await My.first(model, params, condition, values)
          if (!userInfo) {
            return res.send(send_response(null, true, "You Are Not Authorized"))
          }
          try {
            req.user = userInfo
            const input = req.body
            Object.keys(input).forEach(k => {
              if (typeof input[k] === "string") {
                input[k] = input[k].trim()
              }
            })
            next()
          } catch (err) {
            return res.send(send_response(null, true, "You Are Not Authorized"))
          }
        } catch (err) {
          console.log(err)
          return res.send(send_response(null, true, "You Are Not Authorized"))
        }
      }
    })
  } else {
    return res.send(send_response(null, true, "You Are Not Authorized"))
  }
}

exports.isAuthenticated = isAuthenticated
