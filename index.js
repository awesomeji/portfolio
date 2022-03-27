
const express = require('express');
const app = express();
app.use(express.urlencoded( {extended : false } ));// bodyparser
app.use(express.json()); // bodyparser
const cookieparser = require('cookie-parser');  
app.use(cookieparser());


const mongoose = require('mongoose');
const { User } = require('./models/user'); 

//2way to control enviroment variables
const config = require('./config/key');

require('dotenv').config();
const { PORT, MONGO_URI } = process.env;
const port = PORT || 5000;

mongoose.connect(MONGO_URI
).then(() => { console.log('Connected to MongoDB') })
.catch(err => console.log(err));
// { useNewUrlParser: true } is no longer supported from mongoose >=6.0

app.get('/', (req, res) => {
    res.send('Hello express, node, nodemon, mongoDB, mongoose, postman, git, github and react.js');
});

app.post('/api/users/register', (req, res) => {
 
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) return res.json({ success: false, error:err });
        return res.status(200).json({
            success: true,
            userData: doc
        });
    })
});
   
// app.post('/api/users/login', (req, body) => { 

// });

app.listen(port,() => console.log('This app listening at http://localhost:' + port));




