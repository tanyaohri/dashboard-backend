const mongoose = require("mongoose");

const User = new mongoose.Schema({
    email:{
        type:String, 
        trim:true,
        unique:true,
        required:true
    },

    password:{
        type:String,
        required:true
    }
}, {timestamps:true, collection:"user"});

const UserModel = mongoose.model("User", User);

module.exports=UserModel

