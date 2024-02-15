// importing express for creating app
let express=require("express")
let app=express();

// importing connection for making server 
let {connection}=require("./config/db");
let { userRouter } = require("./routes/userRouter");
let { postRouter } = require("./routes/postRouter");

// importing dotenv for accessing data from .env file
require("dotenv").config()


// importing cors
let cors=require("cors");
app.use(cors())

app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Home page of this api")
})


app.use("/post",postRouter)
app.use("/users",userRouter)


// running server on specific port no and connection to database
app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Database connected")
    } catch (error) {
        console.log("Getting error while connecting database")
    }
    console.log(`Server is running on port no ${process.env.port}`)
  
})