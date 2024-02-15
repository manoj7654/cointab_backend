// making user schema
const mongoose=require("mongoose");

// define postModal
const postSchema=mongoose.Schema({
 posts:[],
 userId:String
})
  
const postModal=mongoose.model("post",postSchema);

module.exports={postModal}
