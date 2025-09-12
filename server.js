const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors({
  origin: [
    'https://blog-forus-electric-frontend.vercel.app',
    'http://localhost:3001', // For local development
    'http://localhost:3000'  // Alternative local port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blogapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
try {
  app.use('/api/auth', authRoutes);
  app.use('/api/posts', postRoutes);
  console.log('Routes loaded successfully');
} catch (error) {
  console.error('Error loading routes:', error);
}

app.get('/', (req, res) => {
  res.json({ 
    message: 'Scribbles & Scripts API is running!',
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for: https://blog-forus-electric-frontend.vercel.app`);
}).on('error', (err) => {
  console.error('❌ Server error:', err);
});
