const express = require('express');
const router=express.Router(); 
const {isLoggedIn} = require('../middleware/checkAuth');
const dashboardController=require('../controller/dashboardController');

router.get('/dashboard',isLoggedIn,dashboardController.dashboard);

module.exports=router;