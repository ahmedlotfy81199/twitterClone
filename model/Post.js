const { string } = require('@hapi/joi');
const mongoose = require('mongoose');
const postschema = new mongoose.Schema({
    title: {
        type: String
    },
    photo: {
        type: String
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    
    likes: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    numberoflikes: {
        type: Number,
        default:0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
    }]

})
module.exports = mongoose.model('Post', postschema);