const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Get user
router.get('/:id', auth, async (req, res) => {
  try {
    const data = await User.find({userId: req.params.id})
    res.status(201).json({ message: 'User fetched', data: data });
  } catch(error) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Get all users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: 'Users fetched', data: users });
  } catch(error) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

//Update User
router.put('/:id', (req, res) => {
  // Placeholder for PUT logic
  res.send(`Update user with ID ${req.params.id}`);
});

module.exports = router;
