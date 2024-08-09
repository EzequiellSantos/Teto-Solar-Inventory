const mongoose = require("mongoose")

const logSchema = new mongoose.Schema({

    sn: {
        type: String,
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

        type: String

    },
    obs: {

        type: String

    }
    
})

logSchema.index({ movements: "text", client: "text", sn: "text"})

module.exports = mongoose.model('Logs', logSchema);