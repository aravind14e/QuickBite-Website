const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

dotenv.config();

// Connect to MongoDB
connectDB().catch(err => {
  console.error('MongoDB connection failed:', err.message);
  console.log('Continuing without MongoDB - some features may not work');
});

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
}));

// Body parser middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => res.send('API Running'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log('CORS enabled for http://localhost:3000');
});

console.log('Server is running!');
