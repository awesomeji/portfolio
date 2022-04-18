require('dotenv').config();

const { auth } = require('../middleware/auth');
const { append } = require('express/lib/response');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;
// const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const { verifyToken } = require('../utils/jwt');
const { refreshToken } =require('../middleware/refreshToken');

const { JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRATION_TIME,JWT_REFRESH_SECRET,JWT_REFRESH_EXPIRATION_TIME } = process.env;




module.exports = passport => {

    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = JWT_ACCESS_SECRET
    opts.passReqToCallback = true;
    
    passport.use(new JwtStrategy(opts,(req,jwt_payload, done) => {
        // console.log(passport);
        console.log(req)
        console.log(jwt_payload);
   
   
       
        User.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user)
                }
              
                return done(null, false);
            })
            .catch(err => console.log(err)
           
            );
    }
    ))
};



module.exports = custom => {
    custom.use('custom', new CustomStrategy(
    function (req, done) {
    const split = req.headers.authorization.split(' ');
    const reqAcToken = split[1];
    const reqRfToken = req.cookies['refreshToken'];
            
    const isAccessValid = verifyToken('access', reqAcToken);
    const isRefreshValid = verifyToken('refresh', reqRfToken);
            
    if (!isAccessValid) {
    console.log('you need new access token')
        if (isRefreshValid) {
            console.log('and your refresh token is still valid')
            console.log(isRefreshValid)
            User.findById({ _id: isRefreshValid.id }, (err, user) => {
                if (err) {
                    console.log(err)
                }
                const Payload = {
                    id: user.id,
                    userid: user.userid,
                    role: user.role
                }
                const userInfo = user.toObject()
                userInfo.id = user.id.toString()
                jwt.sign({ id: Payload.id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION_TIME }, (err, refreshToken) => { 
                    if (err) {
                            console.log(err)
                    }
                    userInfo.refreshToken = refreshToken
                    User.saveRefreshToken(refreshToken)
                    
                })
                jwt.sign(Payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION_TIME }, (err, accessToken) => {
                    
                    console.log('new accesstoken : ' + accessToken)
                    
                    userInfo.accessToken = accessToken
                   
                    
                    return done(null, userInfo)
                })
            })
        } else { 
            console.log('your both token expired, try login again')
            return done(null, false)
        }
    
    } else {

        if (isRefreshValid) {


            console.log('you have access token')
            console.log(isAccessValid)
            User.findById(isAccessValid.id)
                .then(user => {
                    if (user) {
                        return done(null, user)
                    }
        
                    return done(null, false);
                })
                .catch(err => console.log(err));
        } else { 
            console.log('your access token is still valid, but your refresh token is expired')
            User.findById(isAccessValid.id)
                .then(user => { 
                    jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION_TIME }, (err, refreshToken) => {
                        if (err) {
                            console.log(err)
                        }
                        user.id = user.id.toString()
                        user.refreshToken = refreshToken
                        User.saveRefreshToken(refreshToken)
                        return done(null, user)
                      }
                )})
        }
    }
        
    // console.log(reqAcToken)
    
}))}

