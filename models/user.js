const mongoose = require('mongoose');

const bcrypt = require('bcrypt');//encrypt password
const saltRounds = 10;

var moment = require('moment');//get local time
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
 
const date = moment().format('YYYY-MM-DD HH:mm:ss'+' KST');

const validator = require('validator'); //validate email


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
    required: true,
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

    validate: [
    function (password) {
        return password.length >= 8 &&
            password.length <= 20 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);;
    },
    '비밀번호는 8자리 이상 20자리 이하 영문 대/소문자와 특수문자, 숫자의 조합으로 입력해주세요.'
    ]
},
role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User',
},
token: {
    type: String
},
tokenExp: {
    type: Number
},
register_date: {
    type: String,
    default: date
    },
member_profile: {
    type: String,
    //for 
}
});

//encrypt password before saving to database using bcrypt
// and mongoose middleware (pre)
//https://mongoosejs.com/docs/middleware.html#pre
userSchema.pre('save', function (next) {

    var user = this;

    console.log(user);
    if (user.isModified('password')) {

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
    
});



const User = mongoose.model('User', userSchema);

module.exports = { User };

