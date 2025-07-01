const MainDAL = require('../DAL/mainDAL');
require("dotenv").config();

const getAllUsers = async() => {
    let users = await MainDAL.getAllUsers();
    if (users.length > 0) {
        users.sort(((a,b) => {
            if (a.fname < b.fname) {
                return -1;
            }
            if (a.fname > b.fname) {
                return 1;
            }
            return 0;
        }));
        return users;
    } else {
        return "No categories found!"
    }}

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

const getCategories = async() => {
    let categories = await MainDAL.getCategories();
    // console.log(products)
    if (categories.length > 0) {
        categories.sort(((a,b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }));
        return categories;
    } else {
        return "No categories found!"
    }
};

const updateCategory = (id, data) => {
    return MainDAL.updateCategory(id, data);
};

const deleteCategory = (id) => {
    return MainDAL.deleteCategory(id);
};

const getProducts = async() => {
    let products = await MainDAL.getProducts();
    // console.log(products)
    if (products.length > 0) {
        products.sort(((a,b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        }));
        return products;
    } else {
        return "No products found!"
    }
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

const getOrdersByUserId = async(id) => {
    let orders = await MainDAL.getOrdersByUserId(id);
    if (orders.length > 0) {
        orders.sort(((a,b) => {
            if (a.createdAt < b.createdAt) {
                return 1;
            }
            if (a.createdAt > b.createdAt) {
                return -1;
            }
            return 0;
        }));
        return orders;
    } else {
        return "No orders found!"
    }
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

