const mongoose = require('mongoose');

const InverterSchema = new mongoose.Schema({

    invoice: {
        type: String,
        required: true,
    },
    sn: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
})

InverterSchema.index({ sn: "text", invoice: "text", description:"text", type: "text"})

module.exports = mongoose.model('Inverter', InverterSchema);