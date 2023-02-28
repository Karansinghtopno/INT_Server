const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        default:""
    },

},{timestamps:true})

const User = mongoose.model("USER",userSchema)

module.exports= User