require('dotenv').config();
const express = require('express')
const { verifyToken } = require('../utils/jwt')
const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRATION_TIME,JWT_REFRESH_SECRET,JWT_REFRESH_EXPIRATION_TIME } = process.env;
const refreshToken = (req, res, next) => { 
    console.log(req)
    console.log(res)
    console.log(next)
    
}

module.exports = { refreshToken };