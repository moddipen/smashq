'use strict';

var express = require('express');
var users = require('./user.controller');
var router = express.Router();

router.post('/users', users.create);
router.get('/users', users.findAll);
router.get('/users/:Id', users.findOne);
router.put('/users/:Id', users.update);
router.delete('/users/:Id', users.delete);

module.exports = router;