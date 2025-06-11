const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    }
/*     minQuantity: {
        type: Number
    },
    stateQuantity: {
        type: String
    } */
});

const kitsSchema = new mongoose.Schema({
    teamName: {
        type: String
    },
    materials: [materialSchema]
});

module.exports = mongoose.model("Kits", kitsSchema)