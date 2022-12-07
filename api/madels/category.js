const {Schema, model} = require('mongoose');

const Category = new Schema({
    photo: Array,
    object: {
        type: Schema.Types.ObjectId,
        ref: "Object"
    },
    name: String,
    padez_soni: String,
    qavat_soni: String,
    bir_padez_xona: String,
    createdAt: Date,
    updateAt: Date
})

module.exports = model("Category", Category)