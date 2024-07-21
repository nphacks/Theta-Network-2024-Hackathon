const mongoose = require('mongoose');
let pwd = 'jSiEAMVPic6z1k6z'
const uri = "mongodb+srv://nishthahackathon:jSiEAMVPic6z1k6z@theta-network-2024-hack.s10v20b.mongodb.net/Theta-Network-2024-Hackathon?retryWrites=true&w=majority&appName=Theta-Network-2024-Hackathon";

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB with Mongoose!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
