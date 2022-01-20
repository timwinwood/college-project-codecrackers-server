/**
 * algoRoutes.js - a script that provides a module with routes for Algorithms
 *
 * @author Tim Winwood - x20213638
 * @version 1.0
 */
const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const Algo = mongoose.model('Algo');
const router = express.Router();
router.use(requireAuth);

// get route to fetch all Algorithms
router.get('/algos', async (req, res) => {
  const algos = await Algo.find({});
  res.send(algos);
});

// post route to create an Algorithm
router.post('/algos', async (req, res) => {
  
  // check that request contains required attributes, if not, reject the request, respond with status 422
  const { name, steps } = req.body;
  if (!name || !steps) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and steps' });
  }

  // create the Algorithm and save it to the database
  try {
    const algo = new Algo({ name, steps});
    await algo.save();
    res.send(algo);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

// export the module with routes for Algorithms
module.exports = router;
