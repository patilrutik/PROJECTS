// import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Logout = () => {
//   const navigate = useNavigate();

//   // Function to handle logout
//   const handleLogout = () => {
//     // Send a POST request to the backend to logout
//     axios.post('/logout')
//       .then(() => {
//         // Clear the token from local storage (if using local storage) or redirect to login page
//         localStorage.removeItem('token');
//         navigate('/login'); // Redirect to the login page after logout
//       })
//       .catch((error) => {
//         console.error(error);
//         // Handle any errors that occurred during logout
//       });
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// };

// export default Logout;