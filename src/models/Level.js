/**
 * Level.js - a script that provides a mongoose Model for Levels in the MongoDB database
 *
 * @author Tim Winwood - x20213638
 * @version 1.0
 */
const mongoose = require('mongoose');

// declare the Schema for Levels
const levelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    xp: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

// create a MongoDB Collection using the schema
mongoose.model('Level', levelSchema);