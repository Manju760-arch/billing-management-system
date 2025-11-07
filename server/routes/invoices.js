const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/invoiceController');
router.get('/', ctrl.getInvoices);
router.get('/:id', ctrl.getInvoiceById);
router.post('/', ctrl.createInvoice);
module.exports = router;
