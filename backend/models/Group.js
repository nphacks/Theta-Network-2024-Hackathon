const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  firstname: {
      type: String,
      required: true,
  },
  lastname: {
      type: String,
      required: true,
  },
  username: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  groups: {
      type: [String],
      default: []
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true
  },
  groupMembers: {
    type: [UserSchema],
    required: true
  },
  admin: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Group', GroupSchema);