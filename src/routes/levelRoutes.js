/**
 * levelRoutes.js - a script that provides a module with routes for Levels
 *
 * @author Tim Winwood - x20213638
 * @version 1.0
 */
const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const Level = mongoose.model('Level');
const router = express.Router();
router.use(requireAuth);

// get route to fetch all Levels
router.get('/levels', async (req, res) => {
  const levels = await Level.find({});
  res.send(levels);
});

// post route to create a Level
router.post('/levels', async (req, res) => {
  const { name, xp, image } = req.body;

  // check that request contains required attributes, if not, reject the request, respond with status 422
  if (!name || !xp || !image) {
    return res
      .status(422)
      .send({ error: 'You must provide a name, xp and image' });
  }

  // create the Level and save it to the database
  try {
    const level = new Level({ name, xp, image});
    await level.save();
    res.send(level);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

// export the module with routes for Algorithms
module.exports = router;