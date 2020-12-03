const router = require('express').Router();
const User = require('../model/User');
const postController = require('../controller/posts');
const verify = require('../helper/auth/verfiyToken');
const upload =require('../helper/genral/uploadImages');
const cloud=require('../helper/genral/cloudinary');

router.post('/like',async (req,res,next)=>{return next()},verify,postController.like);
router.post('/createpost',async (req,res,next)=>{return next()},verify,upload.upload.single('photo'),cloud.cloud,postController.Createpost);
router.post('/comment',verify,postController.comments);
router.post('/displayposts',verify,postController.displayposts);



module.exports = router;