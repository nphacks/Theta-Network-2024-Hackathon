const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ethers } = require('ethers');
const router = express.Router();

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    metamaskConnected: Boolean,
    address: String,
    message: String,
    signature: String,
    signerAddress: String
  });

  const User = mongoose.model('User', userSchema, 'users');

router.post('/register', async (req, res) => {
    try {
        console.log('User register post hit', req.body)
         // Check if user already exists
         let email = req.body.email
         let user = await User.findOne({ email });
         if (user) {
            return res.status(400).send({error: 'User already exists'});
         } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                fullname: req.body.fullname,
                email: req.body.email,
                password: hashedPassword,
                metamaskConnected: req.body.metamaskConnected
            });
            await newUser.save();
            res.status(201).json({ success: true});
         }
 
         // Hash password
         
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user" });
    }
});

router.patch('/login', async (req, res) => {
    try {
        console.log('User login post hit', req.body)
        let email = req.body.email
        let user = await User.findOne({ email });
        if (!user) return res.status(400).send({error: 'Invalid Email'});

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).send('Invalid Password');

        const userUpdates = {
            metamaskConnected: req.body.metamaskConnected,
            address: req.body.address,
            message: req.body.message,
            signature: req.body.signature,
            signerAddress: req.body.signerAddress
        };
        let updatedUser = await User.findOneAndUpdate({email: email}, userUpdates, { new: true});
        res.status(201).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user" });
    }
});

const isValidSignature = (address, message, signature) => {
    console.log('=====>', message, '====>',signature)
    const signerAddress = ethers.verifyMessage(message, signature);
    const verified = signerAddress.toLowerCase() === address.toLowerCase()
    console.log('=====>', signerAddress)
    return [signerAddress, verified];
  };

router.post('/verify', async (req, res) => {
    const {address, message, signature } = req.body;
    const validSignature = isValidSignature(address, message, signature)
    if (validSignature[1]) {
      res.status(200).send({ verified: true,  signerAddress: validSignature[0]});
    } else {
      res.status(400).send({ verified: false });
    }
});

module.exports = router;