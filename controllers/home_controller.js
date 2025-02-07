const pass = require("../config/passport-local-st");
const User = require("../models/users");
const Carpenter = require("../models/carpenters.js")
module.exports.home = async(req,res)=>{
    try{
        let user= await User.find({})
        const user_mod = await User.findById(pass.user);
        return res.render('home',{
            title: 'Urban',
            cust: user_mod,
            all_user: user
        })
    }catch(err){
        console.log("err in finding user",err)
    }   
}

module.exports.carp = async(req,res)=>{
    try{
        let user= await User.find({})
        const user_mod = await User.findById(pass.user);
        let all_carp = await Carpenter.find({})
        return res.render('carpenters',{
            title: 'Carpenter',
            cust: user_mod,
            all_user: user,
            carp: all_carp
        })
    }catch(err){
        console.log("err in finding user",err)
    }   
}

module.exports.add_carp = async(req,res)=>{
    try{
        let user= await User.find({})
        const user_mod = await User.findById(pass.user);
        if(user_mod.email == 'daggarwal4_be21@thapar.edu'){
            Carpenter.create({
                carpenter_name: req.body.name,
                carpenter_id: req.body.id,
            })
        }
        return res.redirect('back');    
    }catch(err){
        console.log('error in finding user in signing up'); 
        return;
    }
}
