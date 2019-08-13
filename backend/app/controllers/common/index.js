'use strict';

var express = require('express');
var controller = require('./common.controller');
var router = express.Router();

router.get('/:collection', controller.get);
router.get('/:collection/:id', controller.getById);
router.post('/:collection/:id', controller.update);
router.post('/:collection', controller.update);
router.patch('/:collection/:id', controller.update);
router.put('/:collection', controller.create);
router.delete('/:collection/:id', controller.destroy);
router.delete('/soft/:collection/:id', controller.softdestroy);
router.post('/execute/conditions/:collection', controller.executeQuery);
// router.get('/metadata/info/:collection/:type', controller.metadata);
// router.put('/bulk/insert/:collection', controller.bulk_insert);
// router.post('/server/page/:collection', controller.server_side_pagination);

module.exports = router;