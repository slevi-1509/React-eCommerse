const axios = require('axios');
const userModel = require('../models/userModel');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const session = require('express-session');
require("dotenv").config();

const registerNewUser = async (userData)=>{
    let {password} = userData;
    let encryptPassword = await bcrypt.hash(password, 12);
    userData.password = encryptPassword;
    const newUser = new userModel(userData);
    try {
        await newUser.save(); 
        return "New user created successfully";
    } catch (error) {
        return "Error creating new user! " + error.message;
    }
};

const getAllUsers = async() => {
    try {
        let allUsers = await userModel.find({});
        return allUsers;
    } catch (error) {
        return "Error while trying to get all users!" + error.message;
    }
}

const logInUser = async (userData)=>{
    try {
        let user = await userModel.findOne({ username: userData.username });
        if (user) {
            let isValidPass = await bcrypt.compare(userData.password, user.password);
            if (isValidPass) {
                try {
                    let token = jwt.sign({
                        username: user.username,
                        userId: user._id
                    }, process.env.SECRET_KEY,
                    // { expiresIn: 0 }
                    );
                    return {user, token};
                } catch (error) {
                    return "Error while creating token!";
                }
            } else {
                return "Invalid Password!";
            };
        } else {
            return "User not found!";
        }
    } catch (error) {
        return "Error while signing user!";
    }
}

module.exports = {
    getAllUsers,
    registerNewUser,
    logInUser,
};