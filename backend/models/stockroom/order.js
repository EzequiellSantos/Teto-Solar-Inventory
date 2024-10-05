const mongoose = require('mongoose')

const materialsSchema = new mongoose.Schema({

    code: {
        type: String
    },
    Description: {
        type: String
    },
    quantExist: {
        type: Number
    },
    quantOrder: {
        type: Number
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
    materials: [materialsSchema],
    isArrived: Boolean,

})

module.exports = mongoose.model("Order", OrderSchema)