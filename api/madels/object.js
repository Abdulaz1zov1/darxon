const mongoose = require("mongoose");

const objectSchema = mongoose.Schema(
  {
    photo: Array,
    Nomi: String,
    manzili: String,
    QurilishniBoshlanishSanasi: String,
    QurilishniBitishSanasi: String,
    yaratilgan_vaqti: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Object", objectSchema);
