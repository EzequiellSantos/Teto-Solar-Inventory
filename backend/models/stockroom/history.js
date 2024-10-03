const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({

    code: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    quant: {
        type: Number
    },
    date: {
        type: String
    },
    sector: {
        type: String
    },
    type: {
        type: String
    }

})

module.exports = mongoose.model("History", HistorySchema)