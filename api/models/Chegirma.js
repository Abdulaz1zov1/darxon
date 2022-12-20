const mongoose = require('mongoose');

const Chegirma = mongoose.Schema({
    product_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
        index:true
    },
    amount: {
        type: Number, required: true
    },
    date: {
        type: Date,default: Date.now()
    }
})
module.exports = mongoose.model('Chegirma', Chegirma )