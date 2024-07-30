const mongoose = require('mongoose');

const MONGODB_URL = "mongodb+srv://nishthahackathon:jSiEAMVPic6z1k6z@theta-network-2024-hack.9ugedfz.mongodb.net/?retryWrites=true&w=majority&appName=Theta-Network-2024-Hackathon"

const connectDB = async () => {
  try {
    // Replace 'your_mongodb_uri' with your actual MongoDB URI
    const conn = await mongoose.connect(MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
