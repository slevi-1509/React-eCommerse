const express = require('express');
const mainBLL = require('../BLL/mainBLL');
const router = express.Router();
const validateToken = require('../utils/validateToken');

// router.get(api_location, validateToken, async (req, res) => {
//     console.log(api_location);
//     let model;
//     if (api_location.includes("categories")) {
//         model = categoryModel
//     } else if (api_location.includes("products")) {
//         model = productModel
//     } else if (api_location.includes("users")) {
//         model = userModel
//     }
//     try {
//         let data = await model.find({});
//         if (data.length > 0) {
//             res.send(data);
//         } else {
//             return "No data found!"
//         }
//     } catch (error) {
//         return "Error while trying to get data!" + error.message;
//     }
    
// });

router.get('/users', validateToken, async (req, res) => {
    let response = await mainBLL.getAllUsers();
    res.send(response);
});

router.get('/users/:id', validateToken, async (req, res) => {
    let { id } = req.params;
    let response = await mainBLL.getUserById(id);
    res.send(response);
});

router.put('/users/:id', validateToken, async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let response = await mainBLL.updateUser(id, data);
    res.send(response);
});

router.delete('/users/:id', validateToken, async (req, res) => {
    let { id } = req.params;
    let response = await mainBLL.deleteUser(id);
    res.send(response);
});

router.post('/users/import', async (req, res) => {
    let data = req.body;
    let response = await mainBLL.importUsers(data);
    res.send(response);
});

router.get('/categories', validateToken, async (req, res) => {
    let response = await mainBLL.getCategories();
    res.send(response);
});

router.post('/categories', validateToken, async (req, res) => {
    let newCategory = req.body;
    let response = await mainBLL.addCategory(newCategory);
    res.send(response);
});

router.put('/categories/:id', validateToken, async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let response = await mainBLL.updateCategory(id, data);
    res.send(response);
});

router.delete('/categories/:id', validateToken, async (req, res) => {
    let { id } = req.params;
    let response = await mainBLL.deleteCategory(id);
    res.send(response);
});

router.get('/products', validateToken, async (req, res) => {
    let response = await mainBLL.getProducts();
    res.send(response);
});

router.post('/products', validateToken, async (req, res) => {
    let newProduct = req.body;
    let response = await mainBLL.addProduct(newProduct);
    res.send(response);
});

router.put('/products/:id', validateToken, async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let response = await mainBLL.updateProduct(id, data);
    res.send(response);
});

router.delete('/products/:id', validateToken, async (req, res) => {
    let { id } = req.params;
    let response = await mainBLL.deleteProduct(id);
    res.send(response);
});

router.get('/orders', validateToken, async (req, res) => {
    let response = await mainBLL.getOrders();
    res.send(response);
});

router.get('/orders/:id', validateToken, async (req, res) => {
    let { id } = req.params;
    let response = await mainBLL.getOrdersByUserId(id);
    res.send(response);
});

router.post('/orders', validateToken, async (req, res) => {
    let newOrder = req.body;
    let response = await mainBLL.addOrder(newOrder);
    res.send(response);
});

module.exports = router;


