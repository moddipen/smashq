"use strict";

var jwt = require("jsonwebtoken");
var privateKey = process.env.JWT_SECRET_KEY;

function isAuthenticated(req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        return res.send(send_response(null, true, "Token is not valid"));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.send(send_response(null, true, "You Are Not Authorized"));
  }
}

exports.isAuthenticated = isAuthenticated;
