const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    description: {
        type: String
    },
    plate: {
        type: String,
        required: true,
        unique: true
    },
    team: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Vehicles", vehicleSchema)