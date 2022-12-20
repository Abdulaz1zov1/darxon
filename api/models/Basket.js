
const mongoose = require('mongoose');
const basketSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
        index:true
    },
    productID:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true,
        index:true
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Basket', basketSchema );

