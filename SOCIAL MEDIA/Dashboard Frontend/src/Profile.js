import React from 'react'

const Profile = () => {

    const auth=localStorage.getItem('user');
  return (
    <div className='signup-container'>
        <h1 style={{marginBottom:'50px'}}>My Profile</h1>
        <div>
        <img style={{width:'200px',height:'200px',borderRadius:'50%',marginRight:'-40px'}} src='https://img.favpng.com/21/10/7/conservatorio-santa-cecilia-maulana-malik-ibrahim-state-islamic-university-malang-gold-lorem-ipsum-is-simply-dummy-text-of-the-printing-system-png-favpng-ZMuhDyyzHaHZjz8wE34CcysFR.jpg'alt='profile'></img>
            <h5>Name : {JSON.parse(auth).name}</h5>
            <h5>Email : {JSON.parse(auth).email}</h5>
            <h5>Phone no : {JSON.parse(auth).phoneno}</h5>
           
        </div>
    </div>
  )
}

export default Profile