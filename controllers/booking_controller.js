const User = require("../models/users");
const pass = require("../config/passport-local-st");
const Carpenter = require("../models/carpenters.js");
const Booking = require('../models/bookings.js');

module.exports.create = async(req,res)=>{
    try{

        let user_mod = await User.findById(pass.user);
        let cid = await Carpenter.findById(req.params.cid);
        let sid = cid.available_slots.id(req.params.sid);
        if(pass.user){
            let book  = await Booking.create({
                user: user_mod,
                carpenter: cid,
                time:sid         
            })
            let c_t = [cid.carpenter_id, cid.carpenter_name, sid.time,req.params.cid,req.params.sid];
            user_mod.booking.push(c_t);
            // let c_t_id = [cid, book];
            // user_mod.booking_id.push(c_t_id);
            sid.booked = true;
            sid.booking_user = user_mod;
            await user_mod.save();
            await cid.save();
        }else{
            req.flash('error','Not Signed in');
        }
        return res.redirect('back');
    }catch(err){
        console.log("err in booking");
    }   
}

module.exports.delete = async(req,res)=>{
    try{    
        let user_mod = await User.findById(pass.user);
        let cid = await Carpenter.findById(req.params.cid);
        let sid = cid.available_slots.id(req.params.sid);
        let k  = [cid.carpenter_id,cid.carpenter_name,sid.time,req.params.cid,req.params.sid]
        let data = await User.findByIdAndUpdate(user_mod,{$pull:{booking:k}})
        sid.booked = false;
        let c = await Booking.findOneAndDelete({time:sid});

        await user_mod.save();
        await cid.save();

        return res.redirect('back');
    }
    catch(err){
        console.log("err in deleting booking");
    }   
}
        // await Booking.deleteMany({});
