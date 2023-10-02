
import React from 'react';

import Home from './Home'
import Navigationbar from './Navbar'
import Signup from './Signup';
import Login from './Login';
import PostDetails from './PostDetails';
import Create from './Create';
import Posts from './Posts'
import Profile from './Profile';
import PrivateComponent from './PrivateComponent';

import {Routes,Route } from 'react-router-dom'


const App = () => {
 

  return (
    <div>
 

  <Navigationbar   />
 

  <Routes>
  
  <Route element={<PrivateComponent/>}>
    <Route exact path="/" element={ <Home/>}></Route>

   
    <Route path="/create" element={<Create/>}></Route>
 
    <Route path='/posts' element={<Posts/>}/>
 
    <Route path='/posts/:id' element={<PostDetails/>}/>
    <Route path='/profile' element={<Profile />} />
    </Route>
  
    <Route path='/signup' element={<Signup />}></Route>
 
    <Route path='/login' element={<Login />}></Route>

  </Routes> 

  

  
    </div>
  )
}

export default App