const mongoose = require("mongoose");

const userLoginSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userLoginSchema);
