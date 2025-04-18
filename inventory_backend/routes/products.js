const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new product
router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const product = new Product({ name, quantity });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
