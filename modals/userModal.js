// making user schema
const mongoose=require("mongoose");


// define UserModel
const userSchema = mongoose.Schema({
  "id": String,
  "name": String,
  "username": String,
  "email": String,
  "address": Object,
  "phone":String,
  "website": String,
  "company": Object
})
 const UserModel=mongoose.model("users",userSchema) 


module.exports={UserModel}
