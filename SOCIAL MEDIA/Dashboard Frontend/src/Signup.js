import React from 'react'
import {Form,Button} from 'react-bootstrap'
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {Link} from 'react-router-dom'

const Signup = () => {
    const navigate=useNavigate();
    
const[info,setInfo]=useState({
    name:'',
    email:'',
    phoneno:'',
    password:'',
    cpassword:''
})

const handleChange=(e)=>{
    console.log(e.target.value)
    const{name,value}=e.target;

    setInfo(prev=>{
        return{
            ...prev,
            [name]:value,
        }
    })
}

useEffect(()=>{
  

    console.log(info)
},[info])


    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('/signup',info)
        // axios.post('/signup', info)
  .then((res) => {
    if (res.status === 200) {
      window.alert("Registration Successful...!!");
      console.log("Registration Successful...!!");

      // set token and user to local storage
        localStorage.setItem("user",JSON.stringify(res.data.newUser))
        localStorage.setItem("token",JSON.stringify(res.data.auth))
     
      navigate("/login");
    } else {
      window.alert("Invalid Registration");
      console.log("Invalid registration");
    }
    console.log(res);
    
  })
  .catch((err) => {
    window.alert("Registration Failed");
    console.log(err);
  });
    }
   
  return (
    <div className='signup-container'><h1>Signup</h1>
    <Form onSubmit={handleSubmit}>
<Form.Group>
    <Form.Control type='text' name='name' placeholder='Name' value={info.name}  onChange={handleChange} style={{ marginBottom: '1rem' }}></Form.Control>
    <Form.Control type='email' name='email' placeholder='Email' value={info.email}  onChange={handleChange} style={{ marginBottom: '1rem' }}></Form.Control>
    <Form.Control type='tel' name='phoneno'  maxLength='10' value={info.phoneno} placeholder='phone number'   onChange={handleChange} style={{ marginBottom: '1rem' }}></Form.Control>
    <Form.Control type='password' name='password' placeholder='Password' value={info.password}   onChange={handleChange} style={{ marginBottom: '1rem' }}></Form.Control>
    <Form.Control type='password'  name='cpassword' placeholder='confirm password' value={info.cpassword}   onChange={handleChange} style={{ marginBottom: '1rem' }}></Form.Control>

</Form.Group>
<Button type='submit' variant='outline-success'>SIGNUP</Button><br></br><br></br>
<h6>You have an already Account ?<span><Link to='/login'> Login</Link></span></h6>

    </Form>
    </div>
  )
}

export default Signup