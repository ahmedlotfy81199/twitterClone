const User = require('../../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { merge } = require('../../routes/auth');
const nodemailer = require('nodemailer');
const sendEmail = require('../../helper/genral/sendEmail').sendemail
const _ = require('lodash');
const { where } = require('../../model/User');
const register = async (req, res, next) => {

// validate data

    console.debug("entered register body ", req.body)

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword,
        photo: req.result.url,
        resetlink: ''
    });
    try {
        const saveduser = await user.save();
        res.status(200).json({
            state: 1,
            message: "account created"
        });
    } catch (err) {
        res.status(400).send(err)
    }


}
//login.
const login = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.findOne({ email: req.body.email });

    console.debug("user is ", user)

    const token = jwt.sign({ id: user._id.toString() }, 'aa')
    user.updateOne({ resetlink: token });
    (await user).save;
    try {
        res.header('auth-token', token).json({
            state: 1,
            message: "akjds",
            data: {
                token: token
            }
        });
    } catch (err) {
        res.status(400).send(err)
    }

}
const forgetpassword = async (req, res, next) => {
    try {
        console.debug('req.body.....', req.body)
        const token = jwt.sign({ _id: User._id }, 'aa')
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).json({ error: "email is not found " })

        const useer = await User.findOne({ resetlink: token })
        console.debug('gonna run function')
        sendEmail(req.body.email, 'reset password', `
      <a>http://localhost:3000//api/user/forgetpassword/${token} </a>
      
      
      `);
        res.status(200).json({
            message: "ss"
        })
    } catch (err) {
        console.debug(err)
    }
}
const resetpassword = async (req, res, next) => {
    const { resetlink, newpass, email } = req.body;
    var user = await User.findOne({ resetlink: req.body.resetlink })
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.newpass, salt);
    console.debug('user', user)
    if (resetlink) {
        jwt.verify(resetlink, 'aa', function (error, decodedData) {
            if (error) return res.status(400).json({ error: 'faild' })

            if (!user) {
                return res.status(400).json({ error: 'failadd' })
            }

            const obj = { password: hashpassword }
            user = _.extend(user, obj)
            user.save((err, result) => {
                if (err) return res.status(400).json({ message: 'error' })

                else return res.status(200).json({ message: 'success' })
            })

        })
    }
}



module.exports = {
    register, login, forgetpassword, resetpassword

}