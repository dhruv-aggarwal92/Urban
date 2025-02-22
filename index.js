const express = require('express');
const app = express();
const port = 9000;
const expressLayouts = require('express-ejs-layouts');         //header and footers etc.
const path = require('path');

app.use(express.urlencoded());


const db = require('./config/mongoose');     //conect mongoose file with index.js
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-st');

const MongoStore = require('connect-mongo');          //used for store the session i.e. login data even if we restart the server

const flash = require("connect-flash");
const customMware = require('./config/middleware');

app.use(express.static('assets')); 
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views")); 

app.use(session({
    name:"codial",
    secret:"abcd",
    saveUninitialized:false,
    resave:false,
    cokkie:{
        maxAge:(1000*60*100)
    }
    // store: MongoStore.create(                        didn't log out from our page if we rerun the server
    //     {
    //         mongoUrl: process.env.MONGO_URI,
    //         autoRemove: 'disabled'
    //     },
    //     function(err){
    //         console.log(err || 'connect-mongodb setup ok');
    //     }
    // )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);    //use to use user in views
app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    else
    console.log(`Server is succesfully running on port: ${port}`);
})
