const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const eventSchema = new mongoose.Schema({
    eventId: String,
    date: String,
    title: String,
    description: String,
    image: String,
    author: String,
});

const episodeSchema = new mongoose.Schema({
    epsiodeId: String,
    title: String,
    description: String,
    type: String,
    changes: Boolean,
    eventList: [eventSchema]
});

const episodeVersionSchema = new mongoose.Schema({
    episodesList: [episodeSchema]
  });

const timelineSchema = new mongoose.Schema({
    userId: String,
    timelineName: String,
    purpose: String,
    visibility: String,
    editAccess: String,
    intent: String,
    epsiodeVersions: [episodeVersionSchema]
});

const Timeline = mongoose.model('Timeline', timelineSchema, 'timelines');


router.get('/all/timeline/public', async (req, res) => {
    try {
        const publicTimelines = await Timeline.find({ visibility: 'public' });
        res.json(publicTimelines);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/timeline', async (req, res) => {
    try {
        console.log('Timeline post hit', req.body)
        let timeline = req.body
        const newTimeline = new Timeline({timeline});
        await newTimeline.save();
        res.status(201).json({ success: true});
          
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user" });
    }
});

router.get('/timeline/:id', async (req, res) => {
    try {
        const timeline = await Timeline.findById(req.params.id);
        if (!timeline) return res.status(404).send('Timeline not found');
        res.json(timeline);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.patch('/timeline/:id', async (req, res) => {
    
});

router.delete('/timeline/:id', async (req, res) => {
    try {
        const timeline = await Timeline.findByIdAndDelete(req.params.id);
        if (!timeline) return res.status(404).send('Timeline not found');
        res.send('Timeline deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.patch('/timeline/:id/episode/:id', async (req, res) => {
    
});

router.delete('/timeline/:id/episode/:id', async (req, res) => {
    
});

router.patch('/timeline/:id/episode/:id/event/:id', async (req, res) => {
    
});

router.delete('/timeline/:id/episode/:id/event/:id', async (req, res) => {
    
});

module.exports = router;