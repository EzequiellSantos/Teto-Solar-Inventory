const mongoose = require('mongoose')

const TrackingSchema = new mongoose.Schema({

    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
        required: true
    },
    invoice: {
        type: String
    },
    client: {
        type: String
    },
    brand: {
        type: String
    },
    panelsCount:{
        type: Number,
    },
    inputDate:{
        type: String
    },
    inputChecked:{
        type: String
    },
    outputDate: {
        type: String
    },
    outputChecked: {
        type: String
    },
    type: {
        type: String
    } 

})

module.exports = mongoose.model("Trackings", TrackingSchema)