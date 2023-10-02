

import React from 'react'
import {useState,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {Form} from 'react-bootstrap'


const PostDetails = ({match}) => {

const navigate=useNavigate();

    const[post,setPost]=useState([]);

    
    const{id}=useParams();
   
   
   

     // Retrieve the token from localStorage
const token = localStorage.getItem('token');

// Create the headers object with the Authorization header containing the token
const headers = {
  Authorization: `Bearer ${token}`,
};

   
    useEffect(()=>{

        axios.get(`/posts/${id}`,{headers}).then((res)=>
                 setPost(res.data.posts)
                //  console.log(res.data.posts)
                
            
        )
        .catch(err=>console.log(err));

    
     },[id])

  

  return (
    <div className='create-container2'>
 <div className='post-content'>
        <div className='image-container'>
        <h1>{post.title}</h1>
        <img src={post.image} alt='image'  style={{width:'100%',height:'100vh',paddingBottom:'1rem'}}></img>
        </div>
        <div className='description-container'>
        <p>{post.description}</p>

</div>
</div>

<Button variant='outline-dark' style={{width:'10%',marginBottom:'1rem',marginTop:'3rem'}} onClick={()=>navigate('/posts')}>Back</Button>


 
      
      </div>
  )
}

export default PostDetails;


