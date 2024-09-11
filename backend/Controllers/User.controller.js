const { FindByEmail, FindById } = require("../Services/User.service")


exports.getUserInfo = async(req,res)=>{
    try{
        const user = FindById(req.params.id);
        res.status(200).json({
            success:1,
            message:'',
            user:user
        });
    }catch(e){
        res.status(400).json({
            success:0,
            message:e.message
        })
    }
}