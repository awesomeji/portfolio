const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
 
const date = moment().format('YYYY-MM-DD HH:mm:ss');

const validator = require('validator');


//https://mongoosejs.com/docs/guide.html ofiical documentation

//Everything in Mongoose starts with a Schema. 
//Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
// like a table in a MYSQL database.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    id: {
        type: String,
        maxlength: 50,
        required: true,
        trim: true,
        unique: 1,
    },
    email: {
        type: String,
        required : true,
        trim: true,
        unique: 1,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} 은 정확한 이메일형식이아닙니다.'
        }
        

    },
    password: {
        type: String,
    
        required: true,
     
        validate : [

        function(password) {
        
        return password.length >= 8 && password.length <= 20 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);; 
        
        },

        '비밀번호는 8자리 이상 20자리 이하 영문 대/소문자와 특수문자, 숫자의 조합으로 입력해주세요.'

        ]



    },
    role: {
    type: String,
    enum: ['Admin','User'],
    default: 'User',
    },
    token: {
        type: String

    },
    tokenExp: {
        type: Number
    },
    register_date: {
        type: Date,
        default: date
    }
});

//encrypt password before saving to database using bcrypt
// and mongoose middleware (pre)
//https://mongoosejs.com/docs/middleware.html#pre
userSchema.pre('save', function (next) {
    
    // 'this' is the user object which is recieved from post request
    var user = this;
    //think about this
    // when user change their information, usually they fulfill form 
    // and given information already is filled on form
    // so if user only change their nickname, eamil, etc, other infomation will be transfered to database again.
    //but if we encrypt password everytime, even if user didn't change their password,
    // we will encrypt it again and again. so we need to check if password is changed or not.
    // with isModified() method in mongoose, we can check if password is changed or not.    
    
    console.log(user);
    if (user.isModified('password')) {

        bcrypt.genSalt(saltRounds, function (err, salt) {
            //next(err) : if error occurs do not anything below next(err) and
            // go to next middleware (save)
            // when you go to save in index.js, it will pass (err) to save middle ware
            // which will return false and stop the process, so it will not save to DB
            if (err) return next(err);

            //if no error, then hash the password
            //bcrypt.hash(plain text, salt, callback)
            bcrypt.hash(user.password, salt, function (err, hash) {
                //if error occurs, 
                if (err) return next(err);
                //if error does not occur, hash user.password with salt(parameter : hash in callback)
                //and reallocate it to user.password
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
    
});



//To use our schema definition in the other file, we need to export our Schema into a Model we can work with. 
//To do so, we pass it into mongoose.model(modelName, schema):

const User = mongoose.model('User', userSchema);

module.exports = { User };

