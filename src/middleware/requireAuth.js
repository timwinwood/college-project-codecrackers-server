/**
 * requireAuth.js - a script that provides a module to require authentication
 *
 * @author Tim Winwood - x20213638
 * @version 1.0
 */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

// export the requireAuth module
module.exports = (req,  res, next) => {
    
    // get authorization from the request headers
    const {authorization} = req.headers;

    // if no authorization header, reject the request, respond with status 401
    if(!authorization){
        return res.status(401).send({error: 'You must be logged in.'});
    }

    // get the token from the authorization header
    const token = authorization.replace('Bearer ','');

    // verify the token using JWT
    jwt.verify(token,'MY_SECRET_KEY', async (err, payload) => {
       
        // JWT cannot verify the token, reject the request, respond with status 401
        if(err){
            return res.status(401).send({error: 'You must be logged in.'});
        }

        // get the user from the request and find in the database
        const {userId} = payload;
        const user = await User.findById(userId);
        req.user = user;
        
        // call the next function
        next();
    })

}