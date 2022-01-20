/**
 * userRoutes.js - a script that provides a module with routes for Users
 *
 * @author Tim Winwood - x20213638
 * @version 1.0
 */
const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const User = mongoose.model('User');
const router = express.Router();
router.use(requireAuth);

// get route to fetch all Users
router.get('/users', async (req, res) => {
  const users = await User.find({ _id: req.user._id });
  res.send(users);
});

// post route to toggle User VIP status
router.post('/users/user/vip', async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  const isUserVip = user.vip;
  const userUpdate = await User.findOneAndUpdate({ _id: req.user._id },{vip: !isUserVip});
  res.send(userUpdate);
});

// export the module with routes for Users
module.exports = router;