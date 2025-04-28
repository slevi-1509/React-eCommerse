const authDal = require('../DAL/authDAL');
require("dotenv").config();

const getAllUsers = () => {
    return authDal.getAllUsers();
}

const registerNewUser = (userData) => {
    return authDal.registerNewUser(userData);
};

const importUsers = (users) => {
    return authDal.importUsers(users);
};

const logInUser = (userData)  => {
    return authDal.logInUser(userData);
};

module.exports = {
    getAllUsers,
    registerNewUser,
    logInUser,
    importUsers,
};