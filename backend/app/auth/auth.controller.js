const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const privateKey = process.env.JWT_SECRET_KEY;
const saltRounds = 16;

exports.login = (req, res) => {
    User.findOne({ "username": req.body.username })
        .then(object => {
            if (!object) {
                return res.status(404).send({
                    message: "User not found! " + req.body.username
                });
            } else {
                bcrypt.compare(req.body.password, object.hashedPassword).then(isValid => {
                    if (!isValid) {
                        return res.status(404).send({
                            message: "Please Enter Valid Password"
                        });
                    } else {
                        jwt.sign({ id: object._id }, privateKey, {expiresIn:'24h'}, function(err, token) {
                            var obj = JSON.parse(JSON.stringify(object));
                            obj.token = token;
                            res.send(obj);
                        });
                    }
                });
            }
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with username " + req.body.username
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with username :" + req.body.username
            });
        });
}

exports.register = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
        req.body.hashedPassword = hash;
        const user = new User(req.body);
        user.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating."
                });
            });
    });
}

exports.forgotpassword = async (req, res) => {
    try {
        let data = req.body;
        let user = await User.findOne({ username: data.username });
        if (!user) {
            return res.json({ data: null, is_error: true, message: 'Invalid username' });
        } else {
            var replace_var = {
                username: user.firstname,
                link: process.env.SERVER_URL + 'passwordreset/' + user._id
            }
            await send_mail('forgopassword.html', replace_var, user.email, 'Forgot Password');
            return res.json({ data: data, is_error: false, message: 'Email sent' });
        }
    } catch (error) {
        return res.json({ data: error, is_error: true, message: 'error while sending email' });
    }
}

exports.changePassword = async (req, res) => {
    try {
        let data = req.body;
        let user = await User.findOne({ _id: data.id });
        if (!user) {
            return res.json({ data: null, is_error: true, message: 'User not found' });
        } else {
            user.hashedPassword = bcrypt.hashSync(data.password, saltRounds);
            await user.save();
            return res.json({ data: null, is_error: false, message: 'Password changed successfully' });
        }
    } catch (error) {
        return res.json({ data: error, is_error: true, message: 'error while changing password' });
    }
}

exports.updatePassword = async (req, res) => {
    try {
        let data = req.body;
        let user = await User.findOne({ _id: data.id });
        const password = bcrypt.hashSync(data.password, saltRounds);
        const checkPassword = bcrypt.compareSync(data.old_password, user.hashedPassword);
        if (checkPassword) {
            user.hashedPassword = password;
            let saved = await user.save()
            return res.send(send_response(saved, false, "Password updated successfully"));
        } else {
            res.send(send_response(null, true, "Old password wrong."));
        }
    } catch (error) {
        return res.send(send_response(null, true, "Could not find User"));
    }
};