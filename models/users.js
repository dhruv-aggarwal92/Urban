const mongoose = require("mongoose");

const multer = require('multer')
const path = require('path')
const AVATAR_PATH = path.join('/uploads/users/avatars')

  const userSchema = new mongoose.Schema({
      email:{
          type:String,
          required:true,
          unique: true
      },
      password:{
          type:String,
          required:true,
      },
      name:{
          type:String,
          required:true
      },
      booking:[
        [
          {
            type: String,
            required: true
          },
          {
            type: String,
            required: true
          },
          {
            type: String,
            required: true
          },
          {
            type: String,
            required: true
          },
          {
            type: String,
            required: true
          }
        ]
      ],
      booking_id:[
        [
          {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Carpenter'
          },
          {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
          }
        ]
      ],
      avatar:{
          type:String
      }
  },{
          timestamps: true
  });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });

//static functions/methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');  //single means only one file in avatar
userSchema.statics.avatarPath = AVATAR_PATH;
const User = mongoose.model('User', userSchema);
module.exports = User;