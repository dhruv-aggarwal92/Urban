const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://aggarwalkrishna:KrishnaD@cluster0.p3l3d.mongodb.net/urban_db');

const db= mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log('successfully connected to database');
})