const express = require('express');
const Timeline = require('../models/Timeline');
const router = express.Router();

//Create Timeline
router.post('/', async (req, res) => {
  const { timelineName, description, visibility, groupUsers, mainTimeline, parallelTimelines, creatorId } = req.body;

  try {
    const newTimeline = new Timeline({
      timelineName, description, visibility, groupUsers, mainTimeline, parallelTimelines, creatorId
    });

    console.log(newTimeline)

    let savedTimeline = await newTimeline.save();

    res.status(201).json(savedTimeline);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error registering user' });
    }
});

// Get All Timeline with public visibility
router.get('/public', async (req, res) => {
    try {
      const data = await Timeline.find({visibility: 'public'})
      res.status(201).json({ message: 'Timelines fetched', data: data });
    } catch(error) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching timeline datas' });
    }
});

// Get All Timeline of a particular user
router.get('/creatorId/:creatorId', async (req, res) => {
  try {
    const { creatorId } = req.params;
    const data = await Timeline.find({ creatorId: creatorId })
    res.status(200).json({ message: 'Timelines fetched', data: data });

  } catch(error) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching timeline datas' });
  }
});

// Get All Timeline of a particular user in group
router.get('/groups/:creatorId', async (req, res) => {
  try {
    const { creatorId } = req.params;
    console.log('Hello => ', creatorId)
    const data = await Timeline.find({ creatorId: creatorId, visibility: 'group' })
    console.log('Hell => ', data)
    res.status(200).json({ message: 'Timelines fetched', data: data });

  } catch(error) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching timeline datas' });
  }
});

// Get Timeline
router.get('/id/:id', async (req, res) => {
  console.log('Hit get timeline by id ', req.params)
  try {
    const data = await Timeline.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Timeline not found' });
    }
    res.status(200).json({ data: data });
  } catch(error) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching timeline data' });
  }
});

//Update Timeline
router.patch('/id/:id', async (req, res) => {
  try {
    const { mainTimeline, parallelTimelines } = req.body;
    console.log('Hit timeline update', req.body, mainTimeline, parallelTimelines)
    const updatedData = await Timeline.findByIdAndUpdate(
      req.params.id,
      { mainTimeline, parallelTimelines },
      {new: true}
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(201).json({ message: 'Timeline updated', data: updatedData });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating timeline data' });
  }
});

//Update Parallel Timeline
router.patch('/parallel/id/:id', async (req, res) => {
  try {
    const { mainTimeline, parallelTimelines } = req.body;
    console.log('Hit timeline update', req.body, mainTimeline, parallelTimelines)
    const updatedData = await Timeline.findByIdAndUpdate(
      req.params.id,
      { mainTimeline, parallelTimelines },
      {new: true}
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(201).json({ message: 'Timeline updated', data: updatedData });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating timeline data' });
  }
});

module.exports = router;