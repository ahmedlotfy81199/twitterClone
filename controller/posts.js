const User = require('../model/User');
const Post = require('../model/Post');
const Comment = require('../model/Comment');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Schema.Types.ObjectId
const uploadtocloud = require('../helper/genral/cloudinary');

const Createpost = async (req, res, next) => {
    const creator = req.userId;
    const createpost = new Post({
        creator: creator,
        title: req.body.title,
        photo: req.result.url,
    })
    try {
        const savedpost = await createpost.save();
        res.status(200).json({
            state: 1,
            message: "post created",
            data: savedpost
        })
    } catch (err) {
        res.status(400).send(err);

    }

}
const like = async (req, res, next) => {
    const { postid } = req.body;
    if (new ObjectId(postid)) {
        return res.status(400).json({
            state: 0,
            message: "invalid mongodb id "
        })
    }
    let post = await Post.findById(postid)
    const creator = req.userId;
    if (!post) {
        return res.status(400).json({
            state: 0,
            message: "no post found"
        })

    }
    if (post.likes.includes(creator)) {
        return res.status(400).json({
            state: 0,
            message: "you already have liked this post"
        })
    }

    post.numberoflikes++;
    post.likes.push(creator);
    await post.save();
    console.debug("post2", post)
    res.status(200).json({
        state: 1,
        message: "done"
    })

}
const comments = async (req, res, next) => {
    const post = await Post.findById(req.body.postid);
    if (!post) {
        return res.status(400).json({
            state: 0,
            message: "no post found"
        })
    }
    const createcomment = new Comment({
        text: req.body.text,
        post: post._id,
        creator: req.userId
    })
    await createcomment.save();
    post.comments.push(createcomment._id);
    await post.save();
    res.status(200).json({
        state: 1,
        message: "comment done successful",
        data: createcomment
    })



}
const displayposts = async (req, res, next) => {
    const itemprepage = 5;
    const page = req.query.page * 1 || 1;
    const displaypost = (await Post.find().skip((page - 1) * itemprepage).limit(itemprepage).populate({
        path: "creator",
        select: "name"
    }).populate({
        path:"comments",
        select:"text ",
        populate:{
            path:"creator",
            select:"name"
        }
    })
        .select('title photo numberoflikes'));
    if (displaypost) {
        return res.status(200).json({
            state: 1,
            data: displaypost
        })
    }
    res.status(400).json({ state: 0, message: 'display posts faild' })
}



module.exports = {
    like,
    Createpost,
    comments,
    displayposts
}