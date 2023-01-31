const mongoose = require("mongoose")

const OtpSchema=new mongoose.Schema({
    otp:{
        type:String,
    }
    
})

const OtpModel= mongoose.model("otp",OtpSchema)

module.exports = OtpModel;