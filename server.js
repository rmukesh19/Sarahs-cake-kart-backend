const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes');

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);

app.get('/', (req, res) => {
  res.send('Bakery API is running...');
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bakery';

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  bufferCommands: false,         // Fail immediately if disconnected
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch(err => {
    console.error('❌ MongoDB connection error!');
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
    if (err.message.includes('Authentication failed')) {
      console.error('👉 TIP: Your PASSWORD in .env is incorrect.');
    } else if (err.message.includes('ETIMEDOUT') || err.message.includes('ENOTFOUND')) {
      console.error('👉 TIP: Your IP might not be whitelisted in Atlas.');
    }
  });

// Start listening regardless of MongoDB status
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
