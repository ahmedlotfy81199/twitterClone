const router = require('express').Router();
const verify = require('../helper/auth/verfiyToken');
const SuggestedController=require('../controller/suggested');

router.put('/seesuggested',
async(req,res,next)=>{return next()},verify,SuggestedController.seesuggested
)
module.exports = router