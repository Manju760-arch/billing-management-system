const mongoose = require('mongoose');
const InvoiceSchema = new mongoose.Schema({
customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
items: [
{
product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
name: String,
price: Number,
qty: Number,
subtotal: Number,
},
],
taxPercent: { type: Number, default: 0 },
total: { type: Number },
createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Invoice', InvoiceSchema);
