require('dotenv').config();


const { append } = require('express/lib/response');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;
// const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// const User = mongoose.model('User');

const {verifyToken} = require('../utils/jwt');

const { JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRATION_TIME,JWT_REFRESH_SECRET,JWT_REFRESH_EXPIRATION_TIME } = process.env;


module.exports = passport => {

 
    
    passport.use('custom', new CustomStrategy(
        function (req, done) { 
            console.log(req)
        }
    )
    )
}
        // console.log(passport);
       
        



