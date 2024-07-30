const express = require('express');
const auth = require('../middleware/auth');
const Group = require('../models/Group');
const router = express.Router();

//Create Group
router.post('/', auth, async (req, res) => {
  const { groupName, groupMembers, admin } = req.body;
  const groupCount = await Group.countDocuments();
  try {
    const newTimeline = new Timeline({
      groupName, groupMembers, admin, 
    });

    await newTimeline.save();

    res.status(201).json({ message: 'Group created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating group' });
    }
});
// Get group
router.get('/:id', auth, async (req, res) => {
  try {
    const data = await Group.find({groupId: req.params.id})
    res.status(201).json({ message: 'Group fetched', data: data });
  } catch(error) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching group' });
  }
});

//Update group
router.put('/:id', auth, async (req, res) => {
  try {
    const { groupId, groupName, groupMembers, admin } = req.body;
    const updatedData = await Group.findByIdAndUpdate(
      groupId, groupName, groupMembers, admin
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(201).json({ message: 'Group updated', data: updatedData });
  } catch(error) {
    console.error(err);
    res.status(500).json({ message: 'Error updating group data' });
  }
});

module.exports = router;