const jwt=require("jsonwebtoken")

const authentication=(req,res,next)=>{
   try{
          const token=req.headers.authorization
          jwt.verify(token, 'login', (err, decoded)=> {
            if(decoded){
                const userId=decoded.userId
                console.log(userId)
                req.body.userId=userId
                next()
            }
            else{
                res.send({msg:"invalid token",err:err.message})
            }
          });
   }
   catch(err){
    res.send({msg:"invalid token",err:err.message})
   }
}

module.exports=authentication