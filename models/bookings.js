const mongoose = require("mongoose");
path = require('path')

const bookingSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    carpenter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carpenter'
    },
    time:{
        type: Object
    }
},{
        timestamps: true
});


//static functions/methods
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;