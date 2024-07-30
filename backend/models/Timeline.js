const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  timelineId: {
    type: String,
    required: true,
  },
  episodeId: {
    type: String,
    required: true,
  },
  eventTitle: {
    type: String,
    required: true
  },
  eventDescription: {
    type: String,
  },
  creator: {
    type: String,
    required: true,
  },
  eventImages: {
    type: [String],
  },
  eventVideos: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const EpisodeSchema = new mongoose.Schema({
  timelineId: {
    type: String,
    required: true,
  },
  timelineStatus: {
    type: String,
    required: true,
  },
  episodeTitle: {
    type: String,
    required: true
  },
  episodeDescription: {
    type: String,
  },
  creator: {
    type: String,
    required: true,
  },
  updated: {
    type: Boolean
  },
  events: {
    type: [EventSchema] //Events
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const TimelineSchema = new mongoose.Schema({
  timelineName: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  creatorId: {
    type: String,
    required: true,
  },
  visbility: {
    type: String, //public, private, group
    required: true
  },
  groupUsers: {
    type: [String]
  },
  mainTimeline: {
    type: [EpisodeSchema],
    default: []
  },
  parallelTimelines: {
    type: [[EpisodeSchema]], //Episodes
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Timeline', TimelineSchema);