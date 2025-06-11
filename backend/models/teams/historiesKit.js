const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    code: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    }
});

const historiesKits = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
    },
    date: {
        type: String
    },
    materials: {
        type: [materialSchema]
    }
});

module.exports = mongoose.model("HistoriesKits", historiesKits);