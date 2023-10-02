import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import FileBase64 from 'react-file-base64'

const Create = () => {
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: "",
        description: "",
      image:''
       
    })


  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  console.log(token)
  // Create the headers object with the Authorization header containing the token
  const headers = {
    // Authorization: token,
    Authorization: `Bearer ${token}`,
  };

    const handleChange = (e) => {
        console.log(e.target.value)

        const { name, value } = e.target;
        setPost(prev => {
            return {
                ...prev,
                [name]: value,
            
            }
        })
    }

    useEffect(() => {
        console.log(post)
    }, [post])

    const handleClick=(e)=>{
        e.preventDefault();

        console.log('Token before request:', token);
      
          axios
          
          .post("/create", post, {headers})
          .then(res=>
            // console.log('Token after request:', token)
             console.log(res)
          )
          .catch(err=>console.log(err))
          navigate('/posts')
         
    }

   

    return (
        <div className='create-container'>
            <h1>Add Post</h1>
            <Form onSubmit={handleClick}>
            <Form.Group controlId='formBasicName'>
                <Form.Control   type='text' name='title' placeholder='Title' style={{ marginBottom: '1rem' }} value={post.title} onChange={handleChange} required></Form.Control>
                <Form.Control type='text' as="textarea" rows="10" name='description'  placeholder='Description' style={{ marginBottom: '1rem' }} value={post.description} onChange={handleChange} required></Form.Control>
               
                </Form.Group>
             
             <FileBase64 multiple={false}  className='imageupload' onDone={({base64})=>setPost({...post,image:base64})}/>
             
            <Button type='submit' className='btn'  variant='outline-success' style={{ marginBottom: '1rem', width:'20%',marginTop:'1rem'}} >Add Post</Button>
            </Form>
           
            <Button className='btn' variant='outline-dark' onClick={() => navigate('/')} style={{ marginBottom: '1rem',width:'20%' }} >Back</Button>
        </div>
    )
}

export default Create

