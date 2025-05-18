const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { getPasswordHash, verifyPassword, createAccessToken } = require('../utils/auth.utils');
const auth = require('../middleware/auth.middleware');

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const hashedPassword = await getPasswordHash(password);
    const user = await User.create({
      email,
      hashed_password: hashedPassword
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username: email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isValid = await verifyPassword(password, user.hashed_password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = createAccessToken({ sub: user.id });

    res.json({
      access_token: token,
      token_type: 'bearer',
      user
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  res.json(req.user);
});

module.exports = router; 