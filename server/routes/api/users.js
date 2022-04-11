var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config(); //.env file is should be in root directory
const { auth } = require("../../middleware/auth");

const { JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRATION_TIME,JWT_REFRESH_SECRET,JWT_REFRESH_EXPIRATION_TIME } = process.env;
const bcrypt = require('bcrypt');

const { User } = require('../../models/User'); 
const res = require('express/lib/response');

router.get('/', (req, res) => {
    console.log('router')
    res.send("패스포트 모듈 테스트");

});

router.get('/auth', (req, res) => {

});
router.post('/register', (req, res) => {
 
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) return res.json({ success: false, error:err });
        return res.status(200).json({
            success: true,
            userData: doc
        });
    })
});
   
router.post('/login', (req, res) => { 
    const { userid, password } = req.body;
    //find email
    User.findOne({ userid  })
        .then(user => {

            if (!user) {
                   return res.json({
                loginSuccess: false,
                message: "Auth failed, ID not found"
                });
            }
        
    //compare password
    bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
            const accessPayload = {
                id: user.id,
                userid: user.userid,
                role: user.role
            };
            // console.log(accessPayload.id);
            const refreshPayload = {
                id: user.id
            }
                 jwt.sign(accessPayload, JWT_ACCESS_SECRET, { expiresIn:  JWT_ACCESS_EXPIRATION_TIME}, (err, token) => {
        
     
        const accessToken = 'Bearer ' + token
        const accessT = token
       
            jwt.sign(refreshPayload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION_TIME }, (err, refreshT) => {
            //note that maxAge is in milliseconds
            res.cookie('accessToken', accessT, { httpOnly: true})//secure :true
            res.cookie('refreshToken', refreshT, { httpOnly: true })
            res.json({
                success: true,
                refreshToken: 'Bearer ' + refreshT,
                accessToken: accessToken
            })
                User.saveRefreshToken(refreshT)
                //이거 모듈화 왜앙돼
        });
    });
            } else {
                return res.json({ loginSuccess: false, message: "Wrong password" });
            }
            })
        })

});

router.get('/current',passport.authenticate('jwt', { session: false }), (req, res) => { 
    res.json({
        userid: req.user.userid,
        email: req.user.email,
        name: req.user.name,
        // id: req.user.id,
    });
})


module.exports = router;