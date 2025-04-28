const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true}
    }, {
        versionKey: false,
        timestamps: true
});

const categoryModel = mongoose.model('category', categorySchema, 'categories');

module.exports = categoryModel;
