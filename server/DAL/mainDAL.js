const userModel = require('../models/userModel');
const categoryModel = require('../models/categoryModel');
const productModel = require('../models/productModel');
const orderModel = require('../models/orderModel');
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllUsers = async() => {
    try {
        let allUsers = await userModel.find({});
        if (allUsers.length > 0) {
            return allUsers;
        } else {
            return "No users found!"
        }
    } catch (error) {
        return "Error while trying to get all users!" + error.message;
    }
}

const getUserById = async(id) => {
    try{
        let user = await userModel.findById(id);
        // console.log(user)
        if (user) {
            return user;
        } else {
            return "No User found with that ID";
        }
    } catch (error) {
        return "Error! " + error.message + ": " + id;
    }  
};

const updateUser = async(id, data) => {
    try {
        if (data.password){
            let encryptPassword = await bcrypt.hash(data.password, 12);
            data.password = encryptPassword;
        }
        let user = await userModel.findByIdAndUpdate(id, data);
        if (user) {
            return "User updated successfully!";
        } else {
            return "No User found with that ID!";
        }
    } catch (error) {
        return (error.message);
    }
    
};

const deleteUser = async(id) => {
    try {
        let user = await userModel.findByIdAndDelete(id);
        if (user) {
            return "User deleted successfully!";
        } else {
            return "No User found with that ID!";
        }
    } catch (error) {
        return "Error deleting user! " + error.message;    
    }
};

const importUsers = async (data)=>{
    try {
        await categoryModel.insertMany(data[0]);
        for (let user of data[1]) {
            let {password} = user;
            let encryptPassword = await bcrypt.hash(password, 12);
            user.password = encryptPassword;
            const newUser = new userModel(user);
            try {
                await newUser.save(); 
            } catch (error) {
                return "Error importing users! " + error.message;
            }
        }
        let users = await getAllUsers();
        await productModel.insertMany(data[2]);
        let products = await getProducts();
        data[3].map((order,index)=>{
            let uID = users.find((user)=>{
                return order.customerName == `${user.fname} ${user.lname}`;
            })._id
            let pID = products.find((product)=>{
                return order.title == product.title;
            })._id
            data[3][index].customerId = uID;
            data[3][index].productId = pID;
        })
        await orderModel.insertMany(data[3]);
    } catch (error) {
        return(error.message);
    }
}

const getCategories = async () => {
    try {
        let categories = await categoryModel.find({});
        if (categories.length > 0) {
            return categories;
        } else {
            return "No categories found!"
        }
    } catch (error) {
        return "Error while trying to get categories!" + error.message;
    }
};

const addCategory = async (data)=>{
    const newCategory = new categoryModel(data);
    try {
        await newCategory.save(); 
        return await getCategories();
    } catch (error) {
        return "Error creating new category! " + error.message;
    }
};

const updateCategory = async(id, data) => {
    try {
        await categoryModel.findByIdAndUpdate(id, data);
        return await getCategories();
    } catch (error) {
        return (error.message);
    }
};

const deleteCategory = async(id) => {
    try {
        await categoryModel.findByIdAndDelete(id);
        return await getCategories();
    } catch (error) {
        return (error.message);    
    }
};

const getProducts = async () => {
    try {
        let products = await productModel.find({});
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
    } catch (error) {
        return "Error while trying to get products!" + error.message;
    }
};

const addProduct = async (data)=>{
    // const newProduct = new productModel(data);
    try {
        await productModel.insertMany(data); 
        return await getProducts();
        // return "New product created successfully";
    } catch (error) {
        return "Error creating new product! " + error.message;
    }
};

const updateProduct = async(id, data) => {
    try {
        await productModel.findByIdAndUpdate(id, data);
        return await getProducts();
    } catch (error) {
        return (error.message);
    }
};

const deleteProduct = async(id) => {
    try {
        await productModel.findByIdAndDelete(id);
        return await getProducts();
    } catch (error) {
        return (error.message);    
    }
};

const getOrders = async () => {
    try {
        let orders = await orderModel.find({});
        if (orders.length > 0) {
            return orders;
        } else {
            return "No orders found!"
        }
    } catch (error) {
        return "Error while trying to get orders!" + error.message;
    }
};

const getOrdersByUserId = async (id)=>{
    try{
        let orders = await orderModel.find({customerId: id});
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
    } catch (error) {
        return "Error getting orders! " + error.message;
    }  
};

const addOrder = async (data)=>{
    try {
        await orderModel.insertMany(data);
        data.forEach (async e => {
            await productModel.findOneAndUpdate(
                { "_id": e.productId },
                { $inc: { quantity: -e.quantity, bought: e.quantity } }
            )
        });
        return await getProducts();
    } catch (error) {
        return "Error creating new order! " + error.message;
    }
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

