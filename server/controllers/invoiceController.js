const Invoice = require('../models/Invoice');
const Product = require('../models/Product');

exports.createInvoice = async (req, res) => {
  try {
    const { customer, items, taxPercent = 0 } = req.body;

    let total = 0;
    const enrichedItems = [];

    for (const it of items) {
      // it: { product: productId, qty }
      const prod = await Product.findById(it.product);
      if (!prod) return res.status(400).json({ error: 'Product not found: ' + it.product });

      if (prod.stock < it.qty) {
        return res.status(400).json({error: `Not enough stock for ${prod.name}. Available: ${prod.stock}` });
      }

      const subtotal = prod.price * it.qty;
      total += subtotal;

      enrichedItems.push({
        name: prod.name,   // no _id copied
        price: prod.price,
        qty: it.qty,
        subtotal,
      });

      // Decrease stock
      prod.stock -= it.qty;
      await prod.save();
    }

    const taxAmount = (total * taxPercent) / 100;
    const finalTotal = total + taxAmount;

    const invoice = new Invoice({
      customer,
      items: enrichedItems,
      taxPercent,
      total: finalTotal,
    });

    await invoice.save();
    res.status(201).json(invoice);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getInvoices = async (req, res) => {
  const invoices = await Invoice.find().populate('customer').sort({ createdAt: -1 });
  res.json(invoices);
};

exports.getInvoiceById = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id).populate('customer');
  if (!invoice) return res.status(404).json({ error: 'Not found' });
  res.json(invoice);
};