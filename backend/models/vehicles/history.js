const mongoose = require('mongoose')

const historyVehicleSchema = new mongoose.Schema({
    drive:{
        type: String,
        required: true
    },
    exitDate:{
        type: Date,
    },
    entryDate:{
        type: Date,
    },
    kmInitial:{
        type: Number,
    },
    kmFinal:{
        type: Number,
    },
    vehicleId:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("HistoryVehicle", historyVehicleSchema)