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

const tokenCheck = (req,res) => {
    let jwtoken = null
        //when both token are valid
    if (req && verifyToken('access', req.cookies['accessToken'])
        && verifyToken('refresh', req.cookies['refreshToken'])) {
   
       
        accessToken = req.cookies['accessToken'];
        jwtoken = accessToken;
        console.log('jwtoken : '+ jwtoken);
        return jwtoken
        
        //when only refresh token is valid
        //issue new access token
    } else if (req && !verifyToken('access', req.cookies['accessToken'])
        && verifyToken('refresh', req.cookies['refreshToken'])) { 
        console.log('you need new access token')

        const refreshTokenInfo = verifyToken('refresh',req.cookies['refreshToken']);
         User.findById({ _id: refreshTokenInfo.id }, (err, user) => {
                const Payload = {
                id: user.id,
                userid: user.userid,
                role: user.role
                }
                jwt.sign(Payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION_TIME }, (err, accessToken) => { 
                    if (err) {
                            console.log(err)
                    }
                
                    console.log('new accesstoken : ' + accessToken)
                    res.cookie('accessToken', accessToken,{ httpOnly: true});
                    jwtoken = accessToken;
                });
                return  jwtoken
            }) 
            
    }
    console.log('where am i')
    return null
    

    }



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
                jwt.sign(Payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION_TIME }, (err, accessToken) => {
                   
                    console.log('new accesstoken : ' + accessToken)

                    User.findById(Payload.id)
                        .then(user => {
                            if (user) {
                                const userInfo = user.toObject()
                                jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION_TIME }, (err, refreshToken) => {
                                    if (err) {
                                    console.log(err)
                                    }
                                    console.log('refreshToken : '+refreshToken)
                                    userInfo.refreshToken = refreshToken
                                })
                                console.log(userInfo)
                                userInfo.accessToken = accessToken
                                return done(null, userInfo)
                            }
                            return done(null, false);
                        })
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
            console.log('how about this case??')
        }
    }
        
    // console.log(reqAcToken)
    
}))}

         // const accessToken = req.cookies['accessToken'];
         // const refreshToken = req.cookies['refreshToken'];
         //     //when both token are valid
         // if (req && verifyToken('access', accessToken)
         //     && verifyToken('refresh', refreshToken)) {
             
         //     const verifyAccessToken = verifyToken('access', accessToken);

           
         //     const user = {
         //         id: verifyAccessToken.id,
         //         userid: verifyAccessToken.userid,
         //         role: verifyAccessToken.role
         //     };
             
         //     console.log(user)
         //     return done(null, user);
         // }
         // // when refresth token is valid but access token expired
         // else if (req && !verifyToken('access', accessToken)
         //     && verifyToken('refresh', refreshToken)) {
         //     console.log('you need new access token')
         //     const refreshTokenInfo = verifyToken('refresh', refreshToken);
         //     User.findById({ _id: refreshTokenInfo.id }, (err, user) => {
         //         const Payload = {
         //             id: user.id,
         //             userid: user.userid,
         //             role: user.role
         //         }
         //         console.log('old access token : ' +req.cookies['accessToken'])
         //         jwt.sign(Payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION_TIME }, (err, accessToken) => {
         //             if (err) {
         //                 console.log(err)
         //             }
                     
         //             console.log('new accesstoken : ' + accessToken)
                  
         //         });
         //          return done(null, true)
         //     })
         //     return done(null, true)
         // }
     