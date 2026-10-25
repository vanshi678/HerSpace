
require('dotenv').config();

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'HerSpace backend is running 🌿' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'HerSpace API is healthy',
    database:
      mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
  });
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from the .env file');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log('🌿 HerSpace MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`HerSpace server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start HerSpace:', error.message);
    process.exit(1);
  }
}

startServer();
