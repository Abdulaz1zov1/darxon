const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
    {
        image: {
            type: String
        },
        userID: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
            index: true
        }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Photo", imageSchema);


