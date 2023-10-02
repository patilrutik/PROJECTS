import React from 'react'
import {Form,Button} from 'react-bootstrap'
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';


const Login = () => {

    const navigate=useNavigate();

const[login,setLogin]=useState({
    email:'',
    password:'',
   
})

const handleChange=(e)=>{
    console.log(e.target.value)
    const{name,value}=e.target;

    setLogin(prev=>{
        return{
            ...prev,
            [name]:value,
        }
    })
}

useEffect(()=>{
    console.log(login)

    const auth=localStorage.getItem('users');
        if(auth){
            navigate('/');
        }
},[login])


   
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/login', login)
          .then((res) => {
            console.log(res.data);
            if (res.status === 200) {
              window.alert("Login successful..!!!");
              console.log("Login successful...!!!");

              //set token and user to local storage
              if(res.data.auth){

                localStorage.setItem('user', JSON.stringify(res.data.userLogin));
                localStorage.setItem('token', res.data.auth);
              }
         
                // Redirect to another page or do other operations
              

              navigate("/");

            } else {
              window.alert("Invalid credentials..!!!");
              console.log("Invalid credentials..!!!");
            }
          })
          .catch((err) => {
            window.alert("Login failed");
            console.log(err);
          });


          
      };
      

  return (
    <div className='signup-container'><h1>Login</h1>
    <Form onSubmit={handleSubmit}>
<Form.Group>
    
    <Form.Control type='email' name='email' placeholder='Email' value={login.email} required onChange={handleChange} style={{ marginBottom: '1rem' }}></Form.Control>
   
    <Form.Control type='password' name='password' placeholder='Password' value={login.password}  required onChange={handleChange} style={{ marginBottom: '1rem' }}></Form.Control>

</Form.Group>
<Button type='submit' variant='outline-success'>LOGIN</Button><br></br><br></br>
<h6>You don't  have an account ?<span><Link to='/signup'> Signup</Link></span></h6>

    </Form>
    </div>
  )
}

export default Login