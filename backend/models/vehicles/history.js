const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
    drive:{
        type: String,
        required: true
    },
    exitDate:{
        type: Date,
    },
    entryDate:{
        type: String,
    },
    kmRod:{
        type: Number,
    },
    vehicleId:{
        type: string,
        required: true
    },
});

module.exports = mongoose.model("HistoryVehicle", historySchema)