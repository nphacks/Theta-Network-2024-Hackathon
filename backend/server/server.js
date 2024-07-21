const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const connectToDatabase = require('./mongoose'); // Import the MongoDB client and connect function


const userRoute = require('./routes/user')



let app = express()

//-------In case hit with CORS error-------
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });
//-----------------------------------------
// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database before starting the server
connectToDatabase().then(() => {
    const port = 3000
    app.listen(port, () => console.log('Server started…'))

    app.use('/api/user', userRoute)

    const timelineSchema = new mongoose.Schema({
        name: String,
        // Define other fields here
      });
    
      const Timeline = mongoose.model('Timeline', timelineSchema, 'timelines');
    
      app.post('/timeline', async (req, res) => {
        try {
            console.log('Timeline post hit', req.body)
          const timeline = new Timeline(req.body);
          const result = await timeline.save();
          res.status(201).json(result);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Failed to create timeline" });
        }
      });
    
      app.get('/timeline', async (req, res) => {
        try {
            console.log('Timeline get hit')
          const timelines = await Timeline.find();
          res.status(200).json(timelines);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Failed to fetch timelines" });
        }
      });
 
    //Handle routes with GET request
    app.get('/timeline/:id', (req, res) => {
        // console.log('Get Timeline hit')
        // res.status(200).json({ status: 200, data: {
        //     id: 1, 
        //     timelineName: 'Test 1', 
        //     purpose: 'Test 1 purpose', 
        //     visibility: 'public',
        //     editAccess: 'public',
        //     intent: 'Study',
        //     episodeVersions: [
        //         { 
        //             episodeList: [{
        //                 episodeId: 1,
        //                 title: 'Episode title 1',
        //                 description: 'Episode Description 1',
        //                 type: 'Study',
        //                 changes: false,
        //                 eventList: [{
        //                     eventId: 1,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 2,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 3,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 }
        //             ]
        //             },
        //             {
        //                 episodeId: 2,
        //                 title: 'Episode title 2',
        //                 description: 'Episode Description 2',
        //                 type: 'Study',
        //                 changes: true,
        //                 eventList: [{
        //                     eventId: 1,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 2,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 3,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 }
        //             ]
        //             },
        //             {
        //                 epsiodeId: 3,
        //                 title: 'Episode title 3',
        //                 description: 'Episode Description 3',
        //                 changes: true,
        //                 type: 'Study',
        //                 eventList: [{
        //                     eventId: 1,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 2,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 3,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 }
        //             ]
        //             },
        //             {
        //                 epsiodeId: 4,
        //                 title: 'Episode title 4',
        //                 description: 'Episode Description 3',
        //                 changes: true,
        //                 type: 'Study',
        //                 eventList: [{
        //                     eventId: 1,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 2,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 3,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 }
        //             ]
        //             }]
        //         },
        //         { 
        //             episodeList: [{
        //                 episodeId: 1,
        //                 title: 'Episode title 1',
        //                 description: 'Episode Description 1',
        //                 type: 'Study',
        //                 changes: false,
        //                 eventList: [{
        //                     eventId: 1,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 2,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 3,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 }
        //             ]
        //             },{
        //                 epsiodeId: 2,
        //                 title: 'Episode title 2',
        //                 description: 'Episode Description 2',
        //                 changes: false,
        //                 type: 'Study',
        //                 eventList: [{
        //                     eventId: 1,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 2,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 3,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 }
        //             ]
        //             },
        //             {
        //                 episodeId: 3,
        //                 title: 'Episode title 3',
        //                 description: 'Episode Description 3',
        //                 changes: false,
        //                 type: 'Study',
        //                 eventList: [{
        //                     eventId: 1,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 2,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 3,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 }
        //             ]
        //             },
        //             {
        //                 epsiodeId: 4,
        //                 title: 'Episode title 4',
        //                 description: 'Episode Description 4',
        //                 changes: true,
        //                 type: 'Study',
        //                 eventList: [{
        //                     eventId: 1,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 2,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 },
        //                 {
        //                     eventId: 3,
        //                     date: '8/15/2024',
        //                     title: 'Event 1 Title',
        //                     description: 'Event 1 description',
        //                     image: 'imageurl',
        //                     author: 'Self'
        //                 }
        //             ]
        //             }]
        //         }
        //     ]
        // }})
    })

    // app.post('/timeline', async (req, res) => {
    //     console.log('Post Timeline hit', req.body)
    //     try {
    //         const timelinesCollection = client.db("Theta-Network-2024-Hackathon").collection("timelines");
    //         // console.log('=====================>',timelinesCollection)
    //         const result = await timelinesCollection.insertOne(req.body);
    //         // console.log('=====================>',result)
    //         res.status(201).json(result);
    //       } catch (error) {
    //         console.error("MongoDB Error:", error);
              
    //         res.status(500).json({ error: "Failed to create timeline" });
    //       }
    // })

    // app.post('/user', async (req, res) => {
    //     try {
    //       const timelinesCollection = client.db("Theta-Network-2024-Hackathon").collection("timelines");
    //       const result = await timelinesCollection.insertOne(req.body);
    //       res.status(201).json(result);
    //     } catch (error) {
    //       res.status(500).json({ error: "Failed to create timeline" });
    //     }
    //   });
}).catch(err => {
    console.error("Failed to connect to MongoDB, server not started", err);
  });