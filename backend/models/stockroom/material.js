const mongoose =  require('mongoose')

const MaterialSchema = new mongoose.Schema({

    type: {
        type: String
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: Number
    },
    minQuantity: {
        type: Number,
        required: true
    },
    uniMed: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: ""
    },
    stateQuantity:{
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }    

})

module.exports = mongoose.model("Materials", MaterialSchema)