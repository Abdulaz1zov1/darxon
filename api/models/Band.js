
const mongoose = require('mongoose');
const BandSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
        index:true
    },
    // orderID:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:'Order',
    //     required:true,
    //     index:true
    // },
    phone : {
        type : String,
        required : true
    },
    user_count : {
        type : Number,
        required : true
    },
    arrival_time : {
        type : String,
        required : true
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Band', BandSchema );

