require('dotenv').config();

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRATION_TIME,JWT_REFRESH_SECRET,JWT_REFRESH_EXPIRATION_TIME } = process.env;


function isExpired(token) { 
    const decoded = jwt.decode(token, { complete: true });
    if(!decoded) {
        return new Error('Invalid token');
    }
    const currentTime = Date.now() / 1000;
  
    if(decoded.payload.exp < currentTime) {
        return true;
    }
    return false;
}

module.exports = passport => {
    const cookieExtractor = req => {
        let jwtoken = null

        if (req && req.cookies) {
            accessToken = req.cookies['accessToken'];
            refreshToken = req.cookies['refreshToken'];
            
            // in case of access is expired and refresh is still valid
            if (isExpired(accessToken) && !isExpired(refreshToken)) {
                    console.log('you need to get new access token');
                User.findOne({ token: refreshToken }, function (err, user) {
                    //if refresh token is wrong
                
                    // or is valid
                    // issue access and refresh token both
                    const Payload = {
                    id: user.id,
                    name: user.name,
                    userid: user.userid,
                    email: user.email,
                    regi_date: user.register_date,
                    role: user.role
                    };
                    jwt.sign(Payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION_TIME }, (err, token) => {
                        const accessToken = token;
                        res.cookie('accessToken', accessToken, { httpOnly: true })
                            .catch(err => console.log(err));
                    })
                    
                   
                    
                })
            }
             //왜 앙돼
            // console.log(refreshToken);
            jwtoken = req.cookies['accessToken']
          
        }

        return jwtoken
    }

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


