const mongoose = require("mongoose");

const ShartnomaSchema = mongoose.Schema(
  {
    photo: Array,
    flat: {type: mongoose.Schema.ObjectId, ref: "Flat"},
    number: String,
    inn: {type: String, default: ""},
    passport_seriya: String,
    passport_region: String,
    passport_date: String,
    name: String,
    lastname: String,
    otasini_ismi: String,
    first_price: String,
    total_price: String,
    address: String,
    first_phone: String,
    two_phone: String,
    birthday: String,
    jshr: String,
    shot_raqami: String,
    status: {
      type: Number,
      default: 0
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shartnoma", ShartnomaSchema);
