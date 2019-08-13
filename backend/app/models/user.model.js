const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    hashedPassword: String,
    is_deleted: { type: Boolean, default: false }
}, {
        timestamps: true
    });

module.exports = mongoose.model('User', UserSchema);