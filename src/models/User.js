/**
 * User.js - a script that provides a mongoose Model for Users in the MongoDB database
 *
 * @author Tim Winwood - x20213638
 * @version 1.0
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// declare the Schema for Users
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    xp: {
        type: Number,
        required: true,
        default: 0
    },
    vip: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true
    }
});

// pre-save salt and hash the password
userSchema.pre('save', function(next){
    
    // check if the password has been modified
    const user = this;
    if(!user.isModified('password')){
        return next();
    }

    // generate the salt
    bcrypt.genSalt(10, (err,salt) => {
        if(err){
            return next(err);
        }

        // salt and hash the password
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){
                return next(err)
            }
            user.password = hash;
            next();
        })
    });

});

// compare a canditate password with the users password
userSchema.methods.comparePassword = function(candidatePassword) {
   
   // use Promise to wait for the comparison to be carried out
    const user = this;
    return new Promise((resolve, reject) => {
        
        // compare canditate password with the users password
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            
            // if error, reject the request
            if(err){
                return reject(err);
            }

            // if password is not a match, reject the request
            if(!isMatch){
                return reject(false);
            }

            // password is a match, resolve the request
            resolve(true);

        });
    });
}

// create a MongoDB Collection using the schema
mongoose.model('User', userSchema);