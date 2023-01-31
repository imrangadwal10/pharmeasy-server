const mongoose = require("mongoose")

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
    }
    
})

const UserModel= mongoose.model("user",UserSchema)

module.exports = UserModel;