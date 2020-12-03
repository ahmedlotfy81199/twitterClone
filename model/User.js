const express = require('express');
const Mongoose = require('mongoose');
const usershcema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,

  },
  photo: {
    type: String,
    default:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
  },
  password: {
    type: String,
    required: true,
  },
  resetlink: {
    type: String,
    default: ''
  },
  following: [
    {
      userId: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'User'

      },

    }
  ],

  followers: [
    {
      userId: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
    }
  ],
  posts: [{
    type: Mongoose.Schema.Types.ObjectId, ref: 'Post'
  }]



}, { timestamps: true })
module.exports = Mongoose.model('User', usershcema);