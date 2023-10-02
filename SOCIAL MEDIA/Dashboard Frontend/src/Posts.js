import React from 'react'
import {useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import FileBase64 from 'react-file-base64';

const Posts = () => {
  const[posts,setPosts]=useState([]);
  const[updatedPost,setUpdatedPost]=useState({});
  const navigate=useNavigate();

  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



// Retrieve the token from localStorage
const token =localStorage.getItem('token');

// Create the headers object with the Authorization header containing the token
const headers = {
    Authorization: `Bearer ${token}`,
  //  Authorization:token,
};




useEffect(()=>{
  console.log('Token before request:', token);
  axios.get('/posts',{headers})
  .then((res)=>{
    console.log('Token after successful request:', token);

    console.log(res)
  setPosts(res.data)})
  .catch((err)=>console.log(err))
},[])

const deletePost=(id)=>{
console.log(id)
axios.delete(`/delete/${id}`,{headers})
.then(res=>console.log(res))
.catch(err=>console.log(err))
 

window.location.reload();
}

const updatePost=(post)=>{
  console.log(post)
  setUpdatedPost(post);
  handleShow()
}

const handleChange=(e)=>{
  const{name,value}=e.target;
  setUpdatedPost((prev)=>{
    return{
      ...prev,
      [name]:value,
    }
  })

}

const saveUpdatedPost=()=>{
  console.log(updatedPost);
  axios.put(`/update/${updatedPost._id}`,updatedPost,{headers})
  .then((res)=>console.log(res))
  .catch((err)=>console.log(err))

  handleClose();
  window.location.reload()
}

//function to search post 
const filterPosts = (query) => {
  return posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.description.toLowerCase().includes(query.toLowerCase())
  );
};
  return (
    <div className='create-container1'>
    <div className='heading'>
        {/* <h1>Post Page</h1> */}
<Button  onClick={()=>navigate('/')} variant='outline-dark' style={{width:'20%',marginBottom:'1rem'}}>BACK</Button>
</div>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control style={{marginBottom:'1rem'}}
               placeholder='title'
                name='title'
                value={updatedPost.title ? updatedPost.title:''} onChange={handleChange}></Form.Control>
              
              <Form.Control as="textarea" rows="3" placeholder='description'
              name='description' 
              style={{marginBottom:'1rem'}} 
              value={updatedPost.description ? updatedPost.description:''} onChange={handleChange}></Form.Control>
            </Form.Group>
            
           <FileBase64 multiple={false} style={{marginBottom:'1rem'}}  onDone={({base64})=>setUpdatedPost({...updatedPost,image:base64})}/>
        
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        

          {/* Add the search input field */}
      <div className='search-container'>
        <input 
          type="text"
          placeholder="Type here..."
          className='search-input'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className='search-button' onClick={() => setPosts(filterPosts(searchQuery))}  variant="outline-primary">Search</Button>
      </div>


      <div className="post-grid">
        {posts ? (
          <>
            {posts.map(post=>{
              return(

<div className='post' key={post._id}>
  <h4>{post.title}</h4>
  <img src={post.image}  style={{width:'300px',height:'300px',borderRadius:'20px' ,paddingBottom:'1rem'}} alt='postimage'/>
  {/* <p>{post.description}</p> */}
  <p>{post.createdAt}</p>
 
  <div className='btn-container'>
  <Button onClick={()=>navigate(`/posts/${post._id}`)} style={{width:"20%",marginRight:'1rem'}} variant='outline-primary'>View</Button>
  <Button  variant='outline-info' onClick={()=>updatePost(post)} style={{marginRight:'1rem',width:"20%"}}>UPDATE</Button>
  <Button  variant='outline-danger' onClick={()=>deletePost(post._id)} style={{width:"20%"}}>DELETE</Button>
  </div>
</div>
              )
            })}
          </>
        ):<h1>No Posts..!!!</h1>}
        </div>
    </div>
  )
}

export default Posts;