'use strict';

var express = require('express');
var auth = require('./auth.controller');
var router = express.Router();

router.post('/login', auth.login);
router.post('/register', auth.register);
router.post('/forgotpassword', auth.forgotpassword);
router.post('/updatepassword', auth.updatePassword);
router.post('/changePassword', auth.changePassword);
// router.get('/users/:Id', auth.findOne);
// router.put('/auth/:Id', auth.update);
// router.delete('/auth/:Id', auth.delete);

module.exports = router;