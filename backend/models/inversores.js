const mongoose = require('mongoose');

const InverterSchema = new mongoose.Schema({

    invoice: {
        type: String,
        required: true,
        unique: true
    },
    sn: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Inverter', InverterSchema);