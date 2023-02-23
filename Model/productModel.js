const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:{type:String,required:true},
     brand:{type:String,required:true},
    price:{type:Number,required:true},
    userId:{type:String,required:true}
})

const productModel=mongoose.model("product",productSchema)

module.exports=productModel