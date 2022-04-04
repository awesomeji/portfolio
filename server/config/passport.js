require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const User = mongoose.model('User');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_ACCESS_SECRET

module.exports = passport => {
    //jwtFromRequest extracts the token from the request
    //secretOrKey is the secret key used to sign the token
    //JwtStrategy passes the decoded token to the done function
    //done is a callback function that is called when the token is successfully decoded
    // in done function, find the user in DB with the id in the decoded token(jwt payload)
    // if the user is found, call done with null and the user object
    //done passes the error(which means it's not over) and the user to the next middleware
    // if the user is not found, call done with error and false
    
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
     
        User.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user)
                }
              
                return done(null, false);
            })
            .catch(err => console.log(err)
           
            );
    }));
};