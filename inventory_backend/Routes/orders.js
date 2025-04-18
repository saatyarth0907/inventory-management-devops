

const express = require('express');
const router = express.Router();
const Order = require('../Models/Order');
const Product = require('../Models/Product');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Place a new order
router.post('/', async (req, res) => {
  const { productName, quantity } = req.body;
  try {
    const product = await Product.findOne({ name: productName });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.quantity < quantity) {
      return res.status(400).json({ message: `Insufficient stock. Only ${product.quantity} available.` });
    }

    product.quantity -= quantity;
    await product.save();

    const order = new Order({
      productName,
      quantity,
      orderTime: new Date().toLocaleString(),
      status: 'Pending'
    });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;