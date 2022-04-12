require('dotenv').config();

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const {verifyToken} = require('../utils/jwt');

const { JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRATION_TIME,JWT_REFRESH_SECRET,JWT_REFRESH_EXPIRATION_TIME } = process.env;


// function isExpired(token) { 
//     const decoded = jwt.decode(token, { complete: true });
//     if(!decoded) {
//         return new Error('Invalid token');
//     }
//     const currentTime = Date.now() / 1000;
  
//     if(decoded.payload.exp < currentTime) {
//         return true;
//     }
//     return false;
// }



async function cookieExtractor  (req,res)  {
        let jwtoken = null
    if (req && req.cookies) {
            // console.log(req)
            console.log(res)
            accessToken = req.cookies['accessToken'];
            refreshToken = req.cookies['refreshToken'];
            jwtoken = accessToken;
            if (!verifyToken('access', accessToken)) {
                // in case of access is expired and refresh is still valid
                if (verifyToken('refresh', refreshToken)) {
                    console.log('you need to get new access token');
                await  User.findOne({ token: refreshToken })
                    .then(user => {
                        
                                const Payload = {
                                    id: user.id,
                                    userid: user.userid,
                                    role: user.role
                                }
                                 console.log(Payload);
                                jwt.sign(Payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION_TIME }, (err, token) => {
                                    const accessToken = token;
                                    res.cookie('accessToken', accessToken, { httpOnly: true })
                                })
                                jwtoken = accessToken;
                            })
                            .catch(err => console.log(err));
                } else { }
            }
            }
            console.log('jwtoken : '+jwtoken);
        return jwtoken

    }



module.exports = passport => {

   
    

    const opts = {};
    opts.jwtFromRequest = cookieExtractor;
    opts.secretOrKey = JWT_ACCESS_SECRET
    //jwtFromRequest extracts the token from the request
    //secretOrKey is the secret key used to sign the token
    //JwtStrategy passes the decoded token to the done function
    //done is a callback function that is called when the token is successfully decoded
    // in done function, find the user in DB with the id in the decoded token(jwt payload)
    // if the user is found, call done with null and the user object
    //done passes the error(which means it's not over) and the user to the next middleware
    // if the user is not found, call done with error and false
    
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        
    //    console.log(jwt_payload);
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


