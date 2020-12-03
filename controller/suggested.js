const User = require('../model/User');

const seesuggested = async(req,res,next)=>{
    const {resetlink}=req.body;
    const itemprepage = 5;
    const page = req.query.page *1||1;
    const user= await User.findOne({resetlink:resetlink});
    if(!user){
        res.status(400).json({
            state:0
            ,message:"please login"
        })
        
    }
    const suggested = await User.find().skip((page-1)*itemprepage).limit(itemprepage).select("name email");
        res.status(200).json({
            state:1,
            data: suggested
        })
}
module.exports= {seesuggested,}