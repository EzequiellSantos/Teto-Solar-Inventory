const mongoose = require("mongoose")

const logSchema = new mongoose.Schema({

    inverter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    movements: {

        type: String,
        required: true

    },
    client: {

        type: String

    },
    logDate: {

        type: Date

    },
    obs: {

        type: String

    }
    
})

module.exports = mongoose.model('Logs', logSchema);