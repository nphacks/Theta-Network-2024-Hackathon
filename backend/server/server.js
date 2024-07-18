const express = require('express')
// const cors = require('cors');
let app = express()

//-------In case hit with CORS error-------
// app.use(cors());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
//   });
//-----------------------------------------

//Create Server
const port = 3000
app.listen(port, () => console.log('Server started…'))

//Handle routes with GET request
app.get('/', (req, res) => {
    console.log('Get Timeline hit')
   res.status(200).json({ status: 200, data: [{id: 1, name: 'test', purpose: 'test purpose', visibility: 'public'}] })
})