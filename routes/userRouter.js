// importing express for creating userRouter
const express=require("express");
const userRouter=express.Router();

// importing ,fetchData,addData from controller
const {fetchData,addData,singleUser} = require("../controller/userController");


// fetching ALL data 
userRouter.get("/fetchData",fetchData)
userRouter.get("/single/:id",singleUser)

// fetching single data and storing database
userRouter.post("/create/:id",addData)





// exporting userRouter
module.exports={userRouter}