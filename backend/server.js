const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Import routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/group');
const timelineRoutes = require('./routes/timeline');
const episodeRoutes = require('./routes/episode');
const thetaRoutes = require('./routes/theta');
//Import Mongo
const connectMongoDB = require('./config/mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Connect to MongoDB
connectMongoDB();

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(morgan('dev'));

// Use routes
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/group', groupRoutes);
app.use('/timeline', timelineRoutes);
app.use('/episode', episodeRoutes);
app.use('/theta', thetaRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});