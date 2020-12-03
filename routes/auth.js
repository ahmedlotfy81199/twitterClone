const router = require('express').Router();
const User = require('../model/User');
const joi = require('@hapi/joi');
const authController = require('../controller/auth/auth');
const jwt = require('jsonwebtoken');
const { findOne } = require('../model/User');
const bcrypt = require('bcryptjs');
const verify = require('../helper/auth/verfiyToken');
const upload =require('../helper/genral/uploadImages');
const cloud=require('../helper/genral/cloudinary');
//valdationregister
const registerschema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
})
//login validation
//valdationregister
const loginschema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

router.post('/register',
    // async (req, res, next) => {

    //     const { error } = joi.validate(req.body, registerschema);
    //     if (error) return res.status(400).send(error.details[0].message)
    //     const emailexist = await User.findOne({ email: req.body.email })
    //     if (emailexist) return res.status(400).send('Email is already exists')
    //     return next()

    // }
    upload.upload.single('photo'),cloud.cloud, authController.register)


router.post('/login',
    async (req, res, next) => {
        const { error } = joi.validate(req.body, loginschema)
        if (error) return res.status(400).send(error.details[0].message)
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send('wrong email or password ')
        const validpassword = await bcrypt.compare(req.body.password, user.password)
        if (!validpassword) return res.status(400).send('wrong email or password');
        
        return next()

    }, authController.login)

router.put('/forgetpassword',
async (req,res,next)=>{return next()},authController.forgetpassword
)
router.put('/resetpassword',
async (req,res,next)=>{return next()},authController.resetpassword
)



module.exports = router;