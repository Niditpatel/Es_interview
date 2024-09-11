const jwt = require('jsonwebtoken');
require('dotenv').config({path:'config.env'})

exports.checkForAuthentication = async(req,res,next)=>{
    try{
        const token = req.headers['x-auth-token'];
        if(token){
            jwt.verify(token,process.env.SERECT_KEY,{algorithms:'HS256'},(error,user)=>{
                if(!error) (req.user = user),next();
                else res.status(401).json({
                    success:0,
                    message:'You are not authorized to access this.'
                })
            })
        }else{
            res.status(403).json({
                success:0,
                message:'Forbidden Access'
            })
        }

    }catch(e){
        res.status(400).json({
            success:0,
            message:e.message
        })
    }
}