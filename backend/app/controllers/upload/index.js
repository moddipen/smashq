'use strict';

var express = require('express');
// var multer = require('multer');
var controller = require('./upload.controller');
var upload = require('./multer.config');
var router = express.Router();

router.post('/upload/:collection/:id', upload.single('file'), controller.uploadimage);
router.get('/get/:filename', controller.image)
router.get('/get/:filename/:size', controller.image_or_thumb)
router.get('/getimg/:folder/:filename', controller.image_from_folder)
router.get('/getimg/:folder/:filename/:size', controller.image_thumb_from_folder)
router.get('/getpdf/:folder/:filename', controller.pdf_from_folder)
router.get('/getexcel/:folder/:filename', controller.excel_from_folder)

module.exports = router;