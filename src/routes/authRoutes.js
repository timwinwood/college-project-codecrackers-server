/**
 * authRoutes.js - a script that provides a module with routes for Authorization
 *
 * @author Tim Winwood - x20213638
 * @version 1.0
 */
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const router = express.Router();

// post route to signup
router.post('/signup', async (req, res) => {
    
    // get the email and password from the request
    const {email, password} = req.body;
    
    // create the user and respond with the JWT token
    try{
        const user = new User({email, password});
        await user.save();
        const token = jwt.sign({userId: user._id},'MY_SECRET_KEY');
        res.send({token});
    } catch (err) {
        return res.status(422).send(err.message);
    }

});

// post route to signin
router.post('/signin', async (req, res) => {
    
    // check that request contains required attributes, if not, reject the request, respond with status 422
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).send({error: 'Must provide email and password'});
    }

    // check that there is a user with the email provided, if not, reject the request, respond with status 422
    const user = await User.findOne({email});
    if(!user){
        return res.status(422).send({error: 'Invalid password or email'});
    }

    // check the password provided, and if successull respond with the JWT token
    try{
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id},'MY_SECRET_KEY');
        res.send({token});
    }catch(err){
        return res.status(422).send({error: 'Invalid password or email'});
    }
    
});

// export the module with routes for Authorization
module.exports = router;