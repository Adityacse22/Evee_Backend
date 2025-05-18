const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const { connectDB, closeDB } = require('./db/database');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use(`${config.api.prefix}/auth`, authRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Evee API',
    docs: '/docs',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing server...');
  await closeDB();
  process.exit(0);
});

startServer(); 