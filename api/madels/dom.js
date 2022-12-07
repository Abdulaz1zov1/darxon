const mongoose = require("mongoose");

const domSchema = mongoose.Schema(
  {
    tartirb_raqami: String,
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category"
    },
    soni: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dom", domSchema);
