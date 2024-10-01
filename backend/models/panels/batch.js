const mongoose = require("mongoose")

const BatchSchema = new mongoose.Schema({

    brand: {
        type: String,
        required: true
    },
    invoice: {
        type: String
    },
    client: {
        type: String
    },
    power: {
        type: Number,
        required: true
    },
    panels: {
        type: [String],
        unique: true
    },
    panelsCount: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model("Batch", BatchSchema)