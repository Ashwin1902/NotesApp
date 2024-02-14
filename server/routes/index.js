const express = require('express');
const router=express.Router(); 

const mainController=require('../controller/mainController');

router.get('/',mainController.homePage);
router.get('/about',mainController.aboutPage);


module.exports=router;