const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

//Create new Episode
router.post('/:timelineId', (req, res) => {

    res.send('Create a new episode');
});

// Get Episode
router.get('/:id', (req, res) => {

  res.send(`Get timeline with ID ${req.params.id}`);
});

//Update Epsiode
router.put('/:id', (req, res) => {

  res.send(`Update episode with ID ${req.params.id}`);
});

module.exports = router;