const User = require('../model/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const follow = async (req, res, next) => {
    // get id from token
    const { loggedinperson, otherperson } = req.body;
    const currUser = await User.findByIdAndUpdate(loggedinperson); //finbyid
    const targetUser = await User.findById(otherperson);

    // validte incoming ids 

    const isExising = currUser.following.findIndex(i => i.userId.toString() === targetUser._id.toString())
    if (isExising >= 0) {
        return res.status(422).json({
            state : "0",
            message : "'You Already Following Him'"
        })
    }
    currUser.following.push({
        userId: targetUser._id,
        username: targetUser.name //dont need username
    })
    targetUser.followers.push({
        userId: currUser._id,
        username: currUser.name,
    })
    await currUser.save()
    await targetUser.save()

    res.status(200).send(currUser)
/**
 * {
 * state:0/1
 * data:user
 * message:"anything"
 * 
 * }
 * 
 */
}
const unfollow = async (req, res, next) => {
    const { loggedinperson, otherperson } = req.body

    let currUser = await User.findById(loggedinperson)
    let targetUser = await User.findById(otherperson)

    let isExisingInFollowing = currUser.following.findIndex(cu => cu.userId.toString() === otherperson.toString())
    if (isExisingInFollowing < 0) {
        return res.json({
            state : "0",
            message : "'You Not Yet Following Him.........'"
        })
    }

    
    currUser.following.splice(isExisingInFollowing, 1)
    await currUser.save()

    let isExisingInFollowers = targetUser.followers.findIndex(tu => tu.userId.toString() === loggedinperson.toString())
    targetUser.followers.splice(isExisingInFollowers, 1)
    await targetUser.save()

    res.status(200).json({ message: "unfollowed......" })

}
const seefollowers= async(req,res,next)=>{
    const {resetlink}=req.body;
    const user = await User.findOne({resetlink:resetlink});
    if(!user){
        res.status(400).json({
            state:0,
            message:"please login"
        })
    }
    res.status(200).json({
        state:1,
        message:user.followers
    })

}
const seefollowing= async(req,res,next)=>{
    const {resetlink}=req.body;
    const page = req.query.page*1||1;
    const itemsperpage=1;
    const user = await User.findOne({resetlink:resetlink})
    .populate(
        // here array is for our memory. 
        // because may need to populate multiple things
        {
            path: 'following.userId',
            select: 'name',
            
            options: {
                skip: (page - 1) * itemsperpage,
                limit : itemsperpage,
                lean: true
            },

        },

       

    )
    .lean()
    .select('following')
    res.status(200).json({
        state:1,
        data:user.following
    })
    
}


module.exports = { follow, unfollow , seefollowers , seefollowing };