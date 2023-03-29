const express=require('express');
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const users = require('../controllers/user');
const User=require('../models/user');
const session = require('express-session');
const passport = require('passport');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.createUser));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local' , {failureFlash: true, failureRedirect: '/login', keepSessionInfo: true}) ,users.loginUser);

router.get('/logout', users.logoutUser);    

module.exports=router;