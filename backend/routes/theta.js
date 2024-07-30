const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const bucket = require('../firebaseConfig');

const INFERENCE_ENDPOINT = 'https://thetahackaimdodphpbc-282e03badbd1600c.tec-s1.onthetaedgecloud.com';

// Generate random names
function generateRandomName(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Store image/video in Firebase Storage
const storeImageVideo = async (buffer, mimeType) => {
  const randomName = generateRandomName(15);
  const blob = bucket.file(randomName);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: mimeType
    }
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => {
      reject(err);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve({ imageUrl: publicUrl, imageName: blob.name });
    });

    blobStream.end(buffer);
  });
};

// Generate image
router.post('/generate-image', async (req, res) => {
  console.log('Hitting generate-image', req.body);
  try {
    const response = await axios.post(`${INFERENCE_ENDPOINT}/generate-image`, {
      input: req.body.input
    }, {
      responseType: 'arraybuffer'
    });

    const imageBuffer = Buffer.from(response.data, 'binary');
    const mimeType = 'image/png';

    // Store the image in Firebase Storage
    const result = await storeImageVideo(imageBuffer, mimeType);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/generate-video', async (req, res) => {
  console.log('Hitting generate-video', req.body)
  const { prompt, negative_prompt, num_frames, guidance_scale, num_inference_steps, seed } = req.body;

  try {
      const response = await axios.post(`${INFERENCE_ENDPOINT}/generate-video`, {
          prompt: prompt,
          negative_prompt: negative_prompt || "bad quality, worse quality",
          num_frames: num_frames || 16,
          guidance_scale: guidance_scale || 7.5,
          num_inference_steps: num_inference_steps || 25,
          seed: seed || 42
      }, {
          responseType: 'arraybuffer'
      });

      res.setHeader('Content-Type', 'image/gif');
      res.send(response.data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
});

// // Route to upload an image
// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     const blob = bucket.file(req.file.originalname);
//     const blobStream = blob.createWriteStream({
//       metadata: {
//         contentType: req.file.mimetype
//       }
//     });

//     blobStream.on('error', (err) => {
//       res.status(500).send({ message: err.message });
//     });

//     blobStream.on('finish', () => {
//       const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//       res.status(200).send({ imageUrl: publicUrl, imageName: blob.name });
//     });

//     blobStream.end(req.file.buffer);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

// Route to fetch an image
router.get('/image/:filename', async (req, res) => {
  try {
    const file = bucket.file(req.params.filename);
    const [exists] = await file.exists();

    if (!exists) {
      res.status(404).send({ message: 'File not found' });
      return;
    }

    const [metadata] = await file.getMetadata();
    const readStream = file.createReadStream();

    res.setHeader('Content-Type', metadata.contentType);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
  

module.exports = router;