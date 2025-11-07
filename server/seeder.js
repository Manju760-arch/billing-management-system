// run: node seeder.js (make sure .env MONGO_URI points correctly)
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const Customer = require('./models/Customer');

(async () => {
  await connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/billingdb');
  await Product.deleteMany({});
  await Customer.deleteMany({});

  const p1 = await Product.create({ name: 'Pen', price: 10, stock: 100 });
  const p2 = await Product.create({ name: 'Notebook', price: 40, stock: 50 });
  const p3 = await Product.create({ name: 'Pencil', price: 5, stock: 200 });

  const c1 = await Customer.create({ name: 'Manju', phone: '1234567890', email: 'manju@example.com' });

  console.log('Seeded');
  process.exit();
})();
