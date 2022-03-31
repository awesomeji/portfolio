
const express = require('express');
const passport = require('passport');
const app = express();
const cookieparser = require('cookie-parser');  
const users = require('./routes/api/users');
const mongoose = require('mongoose');
const { User } = require('./models/User'); 


app.use(express.urlencoded( {extended : false } ));// bodyparser
app.use(express.json()); // bodyparser

app.use(passport.initialize());//start before server

app.use(cookieparser());



//2way to control enviroment variables
// const config = require('./config/key');

require('dotenv').config(); //.env file is should be in root directory
const { PORT, MONGO_URI } = process.env;
const port = PORT || 5000;




mongoose.connect(MONGO_URI
).then(() => { console.log('Connected to MongoDB') })
.catch(err => console.log(err));
// { useNewUrlParser: true } is no longer supported from mongoose >=6.0

// 패스포트 모듈 설정
//before start any route, passport will check jwt payload id is in the user collection
//(which means the user is already registered and logged in)
require('./config/passport')(passport);


// 라우팅 파트
app.use('/api/users', users);


app.get('/', (req, res) => {
    res.send('Hello express, node, nodemon, mongoDB, mongoose, postman, git, github and react.js');
});

app.listen(port,() => console.log('This app listening at http://localhost:' + port));




