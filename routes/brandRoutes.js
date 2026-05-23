const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');

// Get all brands
router.get('/', async (req, res) => {
  if (require('mongoose').connection.readyState !== 1) {
    return res.status(503).json({ message: 'Database Connection Error. Please check your .env credentials and IP whitelist.' });
  }
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create brand
router.post('/', async (req, res) => {
  const brand = new Brand(req.body);
  try {
    const newBrand = await brand.save();
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete brand
router.delete('/:id', async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: 'Brand deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
