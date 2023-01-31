const express = require('express');
const connect = require('./config/db');
const UserModel = require('./user/user.model');
const app = express();
const nodemailer=require('nodemailer');
const cors = require('cors');
const OtpModel = require("./user/otp.model")

app.use(express.json())
app.use(cors())

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pharmeasy565@gmail.com",
      pass: "nzyieynqywfqrnmx",
    },
  });

app.get('/', (req, res) => {
    res.send("Working fine")
})

app.post('/signup-login',async (req, res) => {

  const { email } = req.body;

      const user=await UserModel.findOne({email: email});
      let OTP=Math.floor(100000 + Math.random() * 900000);
      OTP=OTP.toString()
      if(user){
          res.send(OTP)
      }else{
        const user=new UserModel(req.body);
        await user.save();
        const otp=new OtpModel({otp:OTP})
        await otp.save();
        res.send({message:"User Created Successfully"})
      }
      const mailOptions = {
        from: "pharmeasy@gmail.com",
        to: email,
        subject: `LOGIN`,
        html: `<h1>OTP is ${OTP}</h1>`,
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
         return console.log("ERROR", err);
        } else {
           console.log("EMAIL SEND" + info.response);
           res.send(`OTP SENDED SUCCESSFULLY`);
        }
      });
      const otp=new OtpModel({otp:OTP})
      await otp.save();
    
})

app.post("/verify",async (req, res) => {
    const {otp}=req.body;

    const OTP=await OtpModel.findOne({otp:otp});

    if(OTP){
         
        res.send({message:"Login Successfull"})
    }else{
        res.send({message:"Wrong Otp"})
    }
})

app.listen(5000,async()=>{
    await connect()
    console.log("server listening on port 5000")
})