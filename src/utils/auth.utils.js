const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const getPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const createAccessToken = (data) => {
  return jwt.sign(data, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};

module.exports = {
  getPasswordHash,
  verifyPassword,
  createAccessToken
}; 