require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URL);

app.use('/api/products', require('./routes/products'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/invoices', require('./routes/invoices'));

app.get('/', (req, res) => res.send('Billing API running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

