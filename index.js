const express=require("express")

const connection=require("./db")

require("dotenv").config()

const cors=require("cors")

const userRouter=require("./Routes/UserRoute")

const productRouter=require("./Routes/productRoute")

const app=express()

app.use(cors())

app.use("/user",userRouter)

app.use("/product",productRouter)

app.use(express.json())

app.get("/",(req,res)=>{
 res.send("homepage")
})

app.listen(process.env.Port,async()=>{
    await connection
    console.log("server is running")
})