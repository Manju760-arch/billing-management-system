const Product = require('../models/Product');
exports.getProducts = async (req, res) => {
const products = await Product.find().sort({ name: 1 });
res.json(products);
};
exports.createProduct = async (req, res) => {
const { name, price, stock, sku, description } = req.body;
const product = new Product({ name, price, stock, sku, description });
await product.save();
res.status(201).json(product);
};
exports.updateProduct = async (req, res) => {
const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(product);
};
exports.deleteProduct = async (req, res) => {
await Product.findByIdAndDelete(req.params.id);
res.json({ message: 'Product deleted' });
};

