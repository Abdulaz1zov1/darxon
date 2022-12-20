
const mongoose = require('mongoose');
const cardSchema = mongoose.Schema({
    cardNomer:{
        type:Number,
        required:true,
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Card', cardSchema );

