var _ = require('lodash');
var mongoose = require("mongoose");
var path = require('path');
var fs = require('fs');
// var Thumbler = require('thumbler');
var async = require('async');

// Get list of things
exports.uploadimage = async (req, res) => {
    try {
        console.log("Hello");
        
        var Model = mongoose.model(req.params.collection);
        console.log(req.params.id);
        console.log(req.file.filename);
        var mod = await Model.findOne({ _id: req.params.id });
       
        if(!mod) {
            res.send(send_response(null, true, "Could not find " + req.params.collection));
        } else {
            mod[req.body.field] = req.file.filename;
            mod.save( (err, obj) => {
                if (err) {
                    console.log(err);
                    res.send(send_response(null, true, "Could not save file"));
                } else {
                    res.send(send_response(obj));
                }
            });
        }
    } catch (error) {
        return res.send(send_response(null, true, "Could not find User"));
    }
};

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

exports.image = function (req, res) {
    var filepath = path.join('public/uploads/', req.params.filename);
    // try{
    //     fs.createReadStream(filepath).pipe(res);
    // } catch(e){}
    console.log(filepath);
    fs.stat(filepath, function (err, stat) {
        if (err == null) {
            res.setHeader('content-type', 'image/*');
            fs.createReadStream(filepath).pipe(res)
        } else if (err.code == 'ENOENT') {
            console.log("file does not exist");
            res.status(404).send();
            // file does not exist
            //fs.writeFile('log.txt', 'Some log\n');
        } else {
            console.log('Some other error: ', err.code);
        }
    });

    //res.send({});
}

exports.image_from_folder = function (req, res) {
    var filepath = path.join('public', req.params.folder, req.params.filename);
    console.log(filepath);
    fs.stat(filepath, function (err, stat) {
        if (err == null) {
            res.setHeader('content-type', 'image/*');
            fs.createReadStream(filepath).pipe(res)
        } else if (err.code == 'ENOENT') {
            console.log("file does not exist");
            res.status(404).send();
            // file does not exist
            //fs.writeFile('log.txt', 'Some log\n');
        } else {
            console.log('Some other error: ', err.code);
        }
    });

    //res.send({});
}
exports.pdf_from_folder = function (req, res) {
    var filepath = path.join('public', req.params.folder, req.params.filename);
    fs.stat(filepath, function (err, stat) {
        if (err == null) {
            res.setHeader('content-type', 'application/pdf');
            fs.createReadStream(filepath).pipe(res)
        } else if (err.code == 'ENOENT') {
            console.log("file does not exist");
            res.status(404).send();
            // file does not exist
            //fs.writeFile('log.txt', 'Some log\n');
        } else {
            console.log('Some other error: ', err.code);
        }
    });
}

exports.excel_from_folder = function (req, res) {
    var filepath = path.join('public', req.params.folder, req.params.filename);
    fs.stat(filepath, function (err, stat) {
        if (err == null) {
            //res.setHeader('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            fs.createReadStream(filepath).pipe(res)
        } else if (err.code == 'ENOENT') {
            console.log("file does not exist");
            res.status(404).send();
            // file does not exist
            //fs.writeFile('log.txt', 'Some log\n');
        } else {
            console.log('Some other error: ', err.code);
        }
    });
}


exports.image_or_thumb = function (req, res) {
    var dir = 'public/uploads/thumbs/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var filepath = path.join('public/uploads/', req.params.filename);
    var size = req.params.size;
    fs.stat(filepath, function (err, stat) {
        if (err == null) {
            if (size === 'thumb') {
                var thumb_filename = path.join('public/uploads/thumbs/', req.params.filename);
                fs.stat(thumb_filename, function (err, stat) {
                    if (err == null) {
                        res.setHeader('content-type', 'image/*');
                        fs.createReadStream(thumb_filename).pipe(res);
                    } else if (err.code == 'ENOENT') {
                        console.log("File Not Exists");
                        Thumbler({
                            type: 'image',
                            input: filepath,
                            output: thumb_filename + ".jpg",
                            size: '200x200' // this optional if null will use the desimention of the video
                        }, function (err, path) {
                            if (err) {
                                console.log(err)
                            } else {
                                fs.rename(path, thumb_filename, function () {
                                    res.setHeader('content-type', 'image/*');
                                    fs.createReadStream(thumb_filename).pipe(res);
                                });
                            }
                        });
                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });
            } else {
                res.setHeader('content-type', 'image/*');
                fs.createReadStream(filepath).pipe(res)
            }
        } else if (err.code == 'ENOENT') {
            console.log("file does not exist");
            res.status(404).send();
        } else {
            console.log('Some other error: ', err.code);
        }
    });

}

exports.image_thumb_from_folder = function (req, res) {
    var folder = req.params.folder;
    var dir = 'public/' + folder + '/thumbs/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var filepath = path.join('public/' + folder + '/', req.params.filename);
    var size = req.params.size;
    fs.stat(filepath, function (err, stat) {
        if (err == null) {
            console.log(filepath + " --- " + size);
            if (size === 'thumb') {
                var thumb_filename = path.join(dir, req.params.filename);
                fs.stat(thumb_filename, function (err, stat) {
                    if (err == null) {
                        res.setHeader('content-type', 'image/*');
                        fs.createReadStream(thumb_filename).pipe(res);
                    } else if (err.code == 'ENOENT') {
                        console.log("File Not Exists");
                        Thumbler({
                            type: 'image',
                            input: filepath,
                            output: thumb_filename + ".jpg",
                            size: '200x200' // this optional if null will use the desimention of the video
                        }, function (err, path) {
                            if (err) {
                                console.log(err)
                            } else {
                                fs.rename(path, thumb_filename, function () {
                                    res.setHeader('content-type', 'image/*');
                                    fs.createReadStream(thumb_filename).pipe(res);
                                });
                            }
                        });
                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });
            } else {
                res.setHeader('content-type', 'image/*');
                fs.createReadStream(filepath).pipe(res)
            }
        } else if (err.code == 'ENOENT') {
            console.log("file does not exist");
            res.status(404).send();
        } else {
            console.log('Some other error: ', err.code);
        }
    });

}