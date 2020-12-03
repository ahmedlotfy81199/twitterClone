const mongoose=require('mongoose');
const commentschema=new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    creator: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    post:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Post' 
    }
})
module.exports = mongoose.model('Comment',commentschema);