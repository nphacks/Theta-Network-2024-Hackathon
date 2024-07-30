const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Register a new user (previous code)
router.post('/register',  async (req, res) => {
  const { firstname, lastname, username, password, email, groups } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      username,
      password: hashedPassword,
      email,
      groups
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
  });

  // Login user and generate JWT token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign a JWT token
    const payload = {
      user: {
        id: user._id,
        username: user.username
      }
    };

    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
    const status = 'success' 
    res.json({ status, user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

  // Protected profile route 
router.get('/profile', auth, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});
  
// Check if user token is active
router.get('/auth-check', auth, (req, res) => {
  console.log('Hitting auth check')
  res.json({ message: 'Token is active', active: true, user: req.user });
});

module.exports = router;