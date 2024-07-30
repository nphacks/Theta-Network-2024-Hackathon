const admin = require('firebase-admin');
const serviceAccount = require('./theta-edge-hackathon-firebase-adminsdk-b4qin-6c99a04ce3.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'theta-edge-hackathon.appspot.com'
});

const bucket = admin.storage().bucket();

module.exports = bucket;
