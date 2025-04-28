const jwt = require("jsonwebtoken");
// const userModel = require('../models/userModel');

const validateToken = async (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        res.send('No token provided.');
    } else {
        let response;
        try {
            jwt.verify(token, process.env.SECRET_KEY);
            // let { username } = req.query
            // if (req.method == "GET") {
            //     response = await updateCounter(username);
            // }
            // if (response == "noActions") {
            //     throw new Error ("No Actions left. Login back tomorrow!");
            // }
            next();
        } catch (error) {
            res.send (error.message.replace("jwt", "Token"));
        }
    } 
   
};

module.exports = validateToken