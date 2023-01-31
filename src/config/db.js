const mongoose=require("mongoose");
mongoose.set("strictQuery", false);

const connect=async()=>{
  return  mongoose.connect("mongodb+srv://i:masai007@cluster0.uoma3hr.mongodb.net/pharmeasy")
}

module.exports=connect;