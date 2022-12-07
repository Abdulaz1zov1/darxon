const {Schema, model} = require('mongoose');

const Flat = new Schema({
    photo: Array,
    dom: {
        type: Schema.Types.ObjectId,
        ref: "Dom"
    },
    num: String,
    id_gen:String,
    xona_soni: String,
    umumiy_kv: String,
    prixoshka: String,
    zal: String,
    xojatxona_1: String,
    xojatxona_2: String,
    vanna_1: String,
    vanna_2: String,
    spalniy: String,
    detskiy: String,
    kuxniya: String,
    status: {
        type: Number,
        default: 0
    },
    createdAt: Date,
    updateAt: Date
})

module.exports = model("Flat", Flat)