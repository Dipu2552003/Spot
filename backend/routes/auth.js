const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const mongoose = require("mongoose");
const JWT_SECRET = 'Harryisagoodb$oy';

// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry, a user with this email already exists" });
    }
    const salt=bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: hash, 
      email: req.body.email,
      imgUrl:req.body.imgUrl,
      bio:req.body.bio,
      prn:req.body.prn,
     
    
    });

    const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});


// Create a User using: POST "/api/auth/login". Doesn't require Auth
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter passowrd').exists(),
  ], async (req, res) => {
      // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


 const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  
  });


  router.post('/getuser', fetchuser, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(userId) } // Match user by ID
        },
        {
          $lookup: {
            from: "questions",
            localField: "_id",
            foreignField: "userId",
            as: "questions",
          },
        },
        {
          $lookup: {
            from: "answers",
            localField: "_id",
            foreignField: "userId",
            as: "answers",
          },
        },
        {
          $project:{
            password: 0,
          }
        }
      ]);
  
      // Combine user information with aggregated data
      const userData = {
        user: user,
        
      };
  
      res.status(200).send(userData);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  router.put('/update', fetchuser, async (req, res) => {
    const { name, email, imgUrl, bio, prn } = req.body;
    const userId = req.user.id; // Get the authenticated user's ID from req.user
  
    const newUser = {};
    if (name) {
      newUser.name = name;
    }
    if (email) {
      newUser.email = email;
    }
    if (imgUrl) {
      newUser.imgUrl = imgUrl;
    }
    if (bio) {
      newUser.bio = bio;
    }
    if (prn) {
      newUser.prn = prn;
    }
  
    try {
      const user = await User.findOne({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the user's information with the new data
      Object.assign(user, newUser);
  
      await user.save();
  
      res.json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });


// Export the router
module.exports = router;
