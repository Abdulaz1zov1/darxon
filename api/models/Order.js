const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        phone: { type: Number },
        address: { type: String },
        coords:{
            lat:{
                type : Number
            },
            long:{
                type : Number
            }
        },
        totalPrice: { type: Number, required: true },
        // totalNum : {type: Number, required: true},
        order_id: { type: String, unique: true },
        user_name: { type: String },
        userID: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        // buyurtma berilgab mahsulotlar is=d si massivda keladi
        product_ID: [
        {
            name:{
                type: String
            },
            count :{
                type: Number
            },
            productID:{
                type: String,
                required : true
            }
        }
    ],
        // buyurtma qabul qilingan yoki qabul qilinmaganini bildiradi
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        imageID:{
            type: mongoose.Schema.ObjectId,
            ref: "Photo"
        }
        // buyurtma egasi bilan gaplashilgan yoki gaplashilmagani haqida malumot chqadi, agar gaplashgan bolsa seen turadi gaplashmagan bolsa unseen turadi
        // process: {
        //     type: String,
        //     enum: ["seen", "unseen"],
        //     default: "unseen",
        // },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Order", orderSchema);


