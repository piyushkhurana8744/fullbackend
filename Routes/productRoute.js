const express=require("express")

const app=express.Router()

const authentication=require("../Middleware/authentication")

const productModel=require("../Model/productModel")

const jwt=require("jsonwebtoken")

app.use(express.json())

app.use(authentication)

app.get("/",async(req,res)=>{
   const reqId=req.body.userId
   try{
      const product=await productModel.find({"userId":reqId})
      res.send(product)
   }
   catch(err){
    res.send({msg:"please login",err:err.message})
   }
})

app.post("/create",async(req,res)=>{
    try{
      const user=await new productModel(req.body)
      await user.save()
      res.send('product is created')
    }
    catch{
      res.send({msg:"product is not created",err:err.message})
    }
})

app.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    const requserId=req.body.userId
    const product=await productModel.findOne({"_id":id})
    const userId=product.userId
    try{
       if(requserId!==userId){
        res.send({msg:"you are not authorized",err:err.message})
       }
       else{
        const product=await productModel.findByIdAndUpdate({"_id":id},req.body)
        res.send("product is updated")
       }
    }
    catch{
        res.send({msg:"product is updated",err:err.message}) 
    }
})

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const requserId=req.body.userId
    const product=await productModel.findOne({"_id":id})
    const userId=product.userId
    try{
       if(requserId!==userId){
        res.send({msg:"you are not authorized",err:err.message})
       }
       else{
        const product=await productModel.findByIdAndDelete({"_id":id},req.body)
        res.send("product is deleted")
       }
    }
    catch{
        res.send({msg:"product is deleted",err:err.message}) 
    }
})


module.exports=app