const Note=require('../models/Notes');
const mongoose = require('mongoose');
const User=require('../models/user');

exports.dashboard= async (req,res)=>{
    let perPaage=12;
    let page=req.query.page || 1;
    const locals={
        title: 'Dashboard',
        description: 'Notes app using Nodejs'
    }
    try {
        const notes=await Note.aggregate([
            {
                $sort: {
                    createdAt: -1
                }
            },
            {$match:{user: new mongoose.Types.ObjectId(req.user.id)}},
            {
                $project:{
                    title: {$substr: ['$title',0,30]},
                    body: {$substr: ['$body',0,100]},
                }
            }
        ])
        .skip(perPaage*page - perPaage)
        .limit(perPaage)
        .exec();
        const count = await Note.countDocuments({ user: req.user.id });
                res.render('dashboard/index',{
                    UserName: req.user.username,
                    locals,
                    notes,
                    layout: '../views/layouts/dashboard',
                    current: page,
                pages: Math.ceil(count/perPaage)  
                });      
      // console.log(notes);
    } catch (error) {
        console.log(error);   
    }
}
//get view specific note
exports.dashboardViewNote= async(req,res)=>{
    console.log(req.params.id);
    const note=await Note.findById({_id: req.params.id})
    .where({user: req.user.id}).lean();

    if(note){
        res.render('dashboard/view-notes',{
            noteID: req.params.id,
            note,
            layout: '../views/layouts/dashboard'
        });
    } else{
        res.send("Smething went wrong");
    }
}

exports.dashboardUpdateNote= async(req,res)=>{
    try {
        await Note.findByIdAndUpdate(
            {_id: req.params.id},
            {title: req.body.title, body: req.body.body}
            ).where({user: req.user.id});
            res.redirect('/dashboard');
    } catch (error) {
            console.log(error);       
     }
}

exports.dashboardDeleteNote= async(req,res)=>{
    try {
        await Note.deleteOne({_id: req.params.id}).where({user: req.user.id});
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

exports.dashboardAddNote= async(req,res)=>{
    res.render('dashboard/add',{
        layout: '../views/layouts/dashboard'
    });
}

exports.dashboardAddNoteSubmit= async(req,res)=>{
    try {
        req.body.user=req.user.id;
        await Note.create(req.body);
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

exports.dashboardSearch= async(req,res)=>{
    try {
        res.render('dashboard/search',{
            searchResult: '',
            layout: '../views/layouts/dashboard',
        })
    } catch (error) {
        console.log(error);
    }
} 

exports.dashboardSubmitSearch= async(req,res)=>{
    try {
        let searchterm=req.body.searchTerm;
        const searchNoSpecialChars=searchterm.replace(/[^a-zA-Z0-9]/g,"");

        const searchResults=await Note.find({
            $or:[
                {title: {$regex: new RegExp(searchNoSpecialChars,'i')}},
                {body: {$regex: new RegExp(searchNoSpecialChars,'i')}},
            ]
        }).where({user: req.user.id});
        res.render('dashboard/search',{
            searchResults,
            layout: '../views/layouts/dashboard',
        })
    } catch (error) {
        console.log(error);
    }
} 