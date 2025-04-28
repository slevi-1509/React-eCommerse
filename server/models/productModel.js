const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageURL: {type: String},
    quantity: {type: Number, required: true}
    }, {
        versionKey: false,
        timestamps: true
});

const productModel = mongoose.model('product', productSchema, 'products');

module.exports = productModel;
