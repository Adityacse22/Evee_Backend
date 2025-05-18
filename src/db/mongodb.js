const mongoose = require('mongoose');
const config = require('../config/config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodb.url, {
      dbName: config.mongodb.dbName
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

module.exports = {
  connectDB,
  closeDB
}; 