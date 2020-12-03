const router = require('express').Router();
const verify = require('../helper/auth/verfiyToken');
const followersController = require('../controller/followers');

router.post('/follow',
async(req,res,next)=>{return next()},verify,followersController.follow
)
router.post('/unfollow',
async(req,res,next)=>{return next()},verify,followersController.unfollow
)
router.put('/seefollowers',
async(req,res,next)=>{return next()},verify,followersController.seefollowers
)
router.put('/seefollowing',
async(req,res,next)=>{return next()},verify,followersController.seefollowing
)
module.exports = router;