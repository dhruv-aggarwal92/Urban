const User = require("../models/users");
const Carpenter = require("../models/carpenters.js");

const pass = require("../config/passport-local-st");
const fs = require('fs');
const path = require('path')

module.exports.user_sign_up = function(req, res){
    return res.render("user_sign_up",{
        title: "Codial | Sign Up"
    });
}
module.exports.user_log_in = function(req, res){
    return res.render("user_log_in",{
        title: "Codial | Log In"
    });
}

module.exports.review = async(req,res)=>{
    try{
        let user = await User.find({});
        const user_mod = await User.findById(pass.user)
        return res.render('review',{
            title: 'Review',
            cust: user_mod
        })

    }catch(err){
        console.log("err in finding user",err)
    }   
}

module.exports.create = async(req,res)=>{
    if(req.body.password!=req.body.confirm_password){
        console.log("qwertyu");
        return res.redirect("back");
    }
    try{
        const findit = await User.findOne({email: req.body.email});
            if(!findit){
                // try{
                    User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    })
                    return res.redirect('/users/log-in');
                //  }
                //  catch(err){
                //     console.log("error in creating in signin username");
                //     return; 
                // }
            }
            else{
                console.log(findit);
                return res.redirect("back");
            }
        // })
    }catch(err){
        console.log('error in finding user in signing up'); 
        return;
    }
}

module.exports.createsession = function(req, res){
    req.flash('success', 'Logged in Successfully');    
    return res.redirect("/");
}

module.exports.destroysession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!');    
        res.redirect('/');
      });
}