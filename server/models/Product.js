const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
name: { type: String, required: true },
sku: { type: String },
price: { type: Number, required: true },
stock: { type: Number, default: 0 },
description: { type: String },
});
module.exports = mongoose.model('Product', ProductSchema);