const express = require('express');
const router = express.Router();
const passport = require('passport');
//const mongoose = require('mongoose');
const User=require('../models/user');
const { initialisingPassport } = require('../config/passportConfig');

initialisingPassport(passport);

router.get('/login',(req,res)=>{
  res.render('../views/login');
})

router.post('/login',passport.authenticate("local",{failureRedirect:"/register",successRedirect:'/dashboard'}),(req,res)=>{
})

router.get('/register',(req,res)=>{
  res.render('../views/auth');
})

router.post('/register',async (req,res)=>{
  const newUser=await User.create(req.body);
  res.render('../views/dashboard/index');
})

router.get('/logout',(req,res)=>{
  req.session.destroy(error=>{
    if(error){
      console.log(error);
      res.send("error loggin out");
    }
    else{
      res.redirect('/');
    }
  })
})

module.exports=router