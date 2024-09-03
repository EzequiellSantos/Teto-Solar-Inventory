const mongoose = require('mongoose')

const TrackingSchema = new mongoose.Schema({

    input_date:{
        type: String
    },
    input_checked:{
        type: String
    },
    output_date: {
        type: String
    },
    output_checked: {
        type: "String"
    }    

})

module.exports = mongoose.model("Trackings", TrackingSchema)