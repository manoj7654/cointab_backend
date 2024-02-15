// importing express for creating postRouter
const express=require("express");
const postRouter=express.Router();

// importing ,fetchData,addData from controller
const {addPost,getPost,createPost,downloadExcel} = require("../controller/postController");


// fetching ALL data 
postRouter.get("/fetchPost/:userId",addPost)
postRouter.get("/getPost",getPost)
postRouter.post("/bulkAdd/:userId",createPost)
postRouter.get("/downlod/:userId",downloadExcel)


// fetching single data and storing database
// postRouter.get("/create",addData)





// exporting postRouter
module.exports={postRouter}