const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  country: String,
  description: String,
  logo: String,
  status: { type: String, default: 'Active' },
  categories: [String],
  productCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);
