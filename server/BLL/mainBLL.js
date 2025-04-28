const MainDAL = require('../DAL/mainDAL');
require("dotenv").config();

const getAllUsers = () => {
    return MainDAL.getAllUsers();
}

const getUserById = (id) => {
    return MainDAL.getUserById(id);
};

const updateUser = (id, data) => {
    return MainDAL.updateUser(id, data);
};

const deleteUser = (id) => {
    return MainDAL.deleteUser(id);
};

const importUsers = (data) => {
    return MainDAL.importUsers(data);
}

const addCategory = (data) => {
    return MainDAL.addCategory(data);
};

const getCategories = () => {
    return MainDAL.getCategories();
};

const updateCategory = (id, data) => {
    return MainDAL.updateCategory(id, data);
};

const deleteCategory = (id) => {
    return MainDAL.deleteCategory(id);
};

const getProducts = () => {
    return MainDAL.getProducts();
};

const addProduct = (data) => {
    return MainDAL.addProduct(data);
};

const updateProduct = (id, data) => {
    return MainDAL.updateProduct(id, data);
};

const deleteProduct = (id) => {
    return MainDAL.deleteProduct(id);
};

const getOrders = () => {
    return MainDAL.getOrders();
};

const getOrdersByUserId = (id) => {
    return MainDAL.getOrdersByUserId(id);
};

const addOrder = (data) => {
    return MainDAL.addOrder(data);
};

module.exports = {
    getAllUsers,
    getUserById,
    importUsers,
    getCategories,
    getProducts,
    addCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    updateCategory,
    deleteCategory,
    getOrders,
    getOrdersByUserId,
    addOrder,
    updateUser,
    deleteUser,
};

