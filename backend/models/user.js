const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user: { 
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true 
    },
    permission: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
