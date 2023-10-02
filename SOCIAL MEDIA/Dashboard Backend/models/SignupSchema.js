const mongoose=require("mongoose");
const signupSchema={
    name:{
        type:String,
    required:true
},

    email:{type:String,
    required:true,
unique:true},

    phoneno:{
        type:Number,
    required:true},

    password:{type:String,
    required:true,
minlength:6},

    cpassword:{type:String,
    required:true,
minlength:6},
   
}


const User=mongoose.model("User",signupSchema);
module.exports=User;