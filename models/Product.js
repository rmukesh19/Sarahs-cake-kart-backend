const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },
  brand: { type: String },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  discount: { type: String },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  images: [{ type: String }],
  description: { type: String },
  specs: { type: Map, of: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
