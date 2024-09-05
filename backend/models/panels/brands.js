const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({

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
        required: true,
    }
})

const batchSchema = new mongoose.Schema({

    batch: clientSchema

})

const BrandSchema = new mongoose.Schema({

    brand: {
        type: String,
        required: true
    },
    batchs: [
        batchSchema
    ]

})

module.exports = mongoose.model("Brands", BrandSchema)