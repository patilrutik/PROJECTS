const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
    required:true},
    
    date:{
        type:Date,
        default:Date.now
    },
          // Add a reference to the user who created the post
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
   
  

})

const Post=mongoose.model("Post",postSchema)

module.exports =Post;