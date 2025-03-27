const mongoose = require('mongoose')

const materialsSchema = new mongoose.Schema({

    code: {
        type: String
    },
    description: {
        type: String
    },
    quantExist: {
        type: Number
    },
    quantOrder: {
        type: Number
    },
    isArrivedSeparate: {
        type: Boolean,
        default: false
    }

})

const OrderSchema = new mongoose.Schema({

    materialsId: {
        type: [String],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    dateArrived: {
        type: String
    },
    materials: [materialsSchema],
    isArrived: Boolean,
    supplier: {
        type: String
    },
    price: {
        type: Number
    }

})

module.exports = mongoose.model("Order", OrderSchema)