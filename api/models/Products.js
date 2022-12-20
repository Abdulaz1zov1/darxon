const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      required: true
    },
    description: {
      type: String,
       required: true 
    },
    categoryName: {
      type : String,
      required : true,
      enum : ['fast_foods','pizzas','national_foods','drinks', 'salat']
    },
    price: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    isExist:{
      type: Boolean,
      default: true,
    },
    chegirma: {
      type: Number,
      default: 0,
    },
    image: {
          type: String,
          required: true,
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
