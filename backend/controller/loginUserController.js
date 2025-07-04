const User = require("../model/userLoginModel");
const bcrypt = require("bcryptjs");

exports.loginUserSchema = async(req, res) => {
    const { userName, userPassword } = res.body;

    try {
        // check if user exists
        // check password matched
        // login sucess message
    } catch(err) {

    }
};