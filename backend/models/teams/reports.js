const mongoose = require('mongoose');

const reportsSchema = new mongoose.Schema({
    team: {
        type: String
    },
    date: {
        type: String
    },
    pathFiles: {
        type: [String]
    },
    text: {
        type: String
    },
    extraRequests: {
        type: String
    },
    isSeparated: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Reports", reportsSchema);