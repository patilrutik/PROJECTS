const express=require("express");
const cors=require("cors");
const bcrypt=require("bcrypt");
 const jwt=require("jsonwebtoken");
 
 const JwtKey='e-commapp';

 require('./db/connection')




const Post=require('./models/PostSchema');

const User=require('./models/SignupSchema');



const port=process.env.PORT || 3001

const app = express();



app.use(express.json({limit: "30mb",extended:true}));
app.use(express.urlencoded({limit: "30mb",extended:true}));

app.use(cors())


//Signup
app.post('/signup',async(req,res)=>{
    const{name,email,phoneno,password,cpassword}=req.body;

    if(!name || !email || !phoneno || !password || !cpassword){
        return res.status(422).json({error:"Please filled field properly"});
        
       }
       try{
        const userExit=await User.findOne({email:email});
        if(userExit){
          return res.status(422).json({error:"Email already exit"})
        }
        else if(password!=cpassword){
          return res.status(422).json({error:"Password not matching"})
        }
        
        else{
        
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          const hashedCpassword=await bcrypt.hash(cpassword, saltRounds);

            const newUser=new User({name,email,phoneno,password:hashedPassword,cpassword:hashedCpassword})

           
           
            try{
              await newUser.save(); 

        //        // Generate a JWT token and send it in the response

        const token = jwt.sign({ _id: newUser._id }, JwtKey, {
          expiresIn: '1h', // Token will expire in 1 hour
        },(err,token)=>{
          if(err){
            return res.status(400).json({ error: "Something went wrong..!!" });
          }
          return res.status(200).json({ message: "Logged in successfully..!!", newUser,auth:token });
        });
              // return res.status(201).json({message:"User registration Successfully...!!",token})
              
            }
            catch(err){
              console.log(err)
            }
          
        
        }
      }
        catch(err){
          console.log(err);
        
       }

})

//Login 

app.post('/login',async(req,res)=>{

    try{  
      
      const{email,password}=req.body;
       
      if(!email || !password){
        return res.status(400).json({error:"Please filled data..!!"})
      }
    
      const userLogin=await User.findOne({email:email})
    //console.log(userLogin)

   
    
    if(userLogin){
      const isMatch=await bcrypt.compare(password,userLogin.password)
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials..!!" });
      }
     
      //add jwt token for authorization
      const token = jwt.sign({ userLogin}, JwtKey, {
        expiresIn: '1h', // Token will expire in 1 hour
      },(err,token)=>{
        if(err){
          return res.status(400).json({ error: "Something went wrong..!!" });
        }
        return res.status(200).json({ message: "Logged in successfully..!!", userLogin,auth:token });
      });

    
    }
    else {
      return res.status(400).json({ error: "Invalid credentials..!!" });
    }
     

    }
    
    catch(err){
      console.log(err);
    }
    
     })
    



app.get("/", (req,res)=>{

    res.send("Express is here")
})

app.post("/create", verifyToken,async(req,res)=>{
  const { title, description, image } = req.body;
   
try{

  const post = new Post({
    title,
    description,
    image,
  
    user: req.userLogin._id // Associating the post with the logged-in user
  });
  await post.save();
  res.status(201).json({ message: 'Post created successfully!' });
  
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
}
});



app.get('/posts', verifyToken, async (req, res) => {
  try {
      const userPosts = await Post.find({ user: req.userLogin._id });
      res.status(200).json(userPosts);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
});



app.delete('/delete/:id', verifyToken, (req,res)=>{
    console.log(req.params)
    Post.findByIdAndDelete({_id:req.params.id})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
})


app.put('/update/:id', verifyToken, (req,res)=>{
    console.log(req.params);
    console.log(req.body);
    Post.findByIdAndUpdate({_id:req.params.id},{
        title:req.body.title,
        description:req.body.description,
        image:req.body.image
    }).then((res)=>console.log(res))
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/posts/:id', verifyToken, (req,res)=>{
  console.log(req.params.id)
  Post.findById(req.params.id
    ).then(items=>res.status(200).json({posts:items}))
  
 
   . catch(err=>{console.log(err)
  res.status(500).json({error:err})})
 
})



function verifyToken(req, res, next) {
  let token = req.headers['authorization'];

  if (token) {
      token = token.split(' ')[1];
      jwt.verify(token, JwtKey, (err, decoded) => {
          if (err) {
              res.status(401).send({ result: 'Please provide valid token' });
          } else {
              req.userLogin = decoded.userLogin; // Store the user's information
              next();
          }
      });
  } else {
      res.status(403).send({ result: 'Please add token with header' });
  }
}



app.listen(port,()=>{
    console.log("server is running")
})