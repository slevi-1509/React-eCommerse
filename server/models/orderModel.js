const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    total: {type: Number, required: true},
    quantity: {type: Number, required: true},
    productId: {type: mongoose.Schema.Types.ObjectId, required: true},
    customerId: {type: mongoose.Schema.Types.ObjectId, required: true},
    customerName: {type: String, required: true}
    }, {
        versionKey: false,
        timestamps: true
});

const orderModel = mongoose.model('order', orderSchema, 'orders');

module.exports = orderModel;
