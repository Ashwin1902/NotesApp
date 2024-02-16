require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDb=require('./server/config/db');
const {User}=require('./server/config/db')
const session=require('express-session');
const passport = require('passport');
const MongoStore=require('connect-mongo');


const app=express();
const port=process.env.PORT || 3000;
app.use(session({secret: "secret",
resave: "false", 
saveUninitialized: true,
store:MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
}),
//cookie : {maxAge: new Date(Date.now()+(3600000))}
})); 
app.use(passport.initialize());
app.use(passport.session());


app.use(express.urlencoded({extended:true}));
app.use(express.json());

//connectTodb
connectDb(process.env.MONGODB_URI);

app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use('/',require('./server/routes/auth'));
app.use('/',require('./server/routes/index'));
app.use('/',require('./server/routes/dashboard'));

app.use('*',(req,res)=>{
    res.status(404).render('404');
})

app.listen(port,()=>{
console.log(`listening on port ${port}`);
});


