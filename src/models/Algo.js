/**
 * Algo.js - a script that provides a mongoose Model for Algos in the MongoDB database
 *
 * @author Tim Winwood - x20213638
 * @version 1.0
 */
const mongoose = require('mongoose');

// declare the Schema for Algo Steps
const stepSchema = new mongoose.Schema({
    text: {
        type: String,
        default: '',
        required: true
    },
    image: {
        type: String,
        default: '',
        required: true
    },
});

// declare the Schema for Algos 
const algoSchema = new mongoose.Schema({
    vip: {
        type: Boolean,
        required: true,
        default: false
    },
    name: {
        type: String,
        default: '',
        required: true
    },
    steps: [stepSchema]
});

// create a MongoDB Collection using the schema
mongoose.model('Algo', algoSchema);