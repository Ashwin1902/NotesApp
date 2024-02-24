const express = require('express');
const router = express.Router();
const passport = require('passport');
//const mongoose = require('mongoose');
const User=require('../models/user');
const Note=require('../models/Notes');

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
  const user=await User.create(req.body);
  const locals={
    title: 'Dashboard',
    description: 'Notes app using Nodejs'
}
try {
    const notes=await Note.find({});
    res.render('dashboard/index',{
        UserName: user.username,
        locals,
        notes,
        layout: '../views/layouts/dashboard'  
    });
  // console.log(notes);
} catch (error) {
    console.log(error);   
}
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