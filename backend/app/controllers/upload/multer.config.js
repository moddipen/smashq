var multer = require('multer');
// var crypto = require('crypto');

var storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    cb(null, Date.now() + ext);
  }
  /*filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      //cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      cb(null, raw.toString('hex') + Date.now()) ;
    });
  }*/
});
var upload = multer({ storage: storage });

module.exports = upload;