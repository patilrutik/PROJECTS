
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';


function Navigationbar() {

  const auth=localStorage.getItem('user');

const navigate=useNavigate();

  const logout=()=>{
    console.log("apple")
    localStorage.clear();
    navigate('/signup')
  }
  return (
    <>
      <Navbar bg="dark" variant="dark" className='nav-container' fixed='top'>
      {auth ?  <Container >
       
       <Navbar.Brand href="/">Home</Navbar.Brand>
       <Nav className="me-auto">
         <Nav.Link href="/posts">Posts</Nav.Link>
         <Nav.Link href="/create">Add Post</Nav.Link>
         <Nav.Link href="/update">Update</Nav.Link>
         <Nav.Link style={{marginLeft:'300px',fontWeight:'bolder',color:'white'}} href="/update">Blog-Dashboard</Nav.Link>
         </Nav>
         <Nav className="ml-auto">

          {/* ... Other links */}
          
       
         
         
           
          <Nav.Link style={{margin:'20px'}} onClick={logout} href="/signup">Logout</Nav.Link>

         <Nav.Link href="/profile" >
         <img style={{width:'70px',height:'70px',borderRadius:'50%',marginRight:'-40px'}} src='https://img.favpng.com/21/10/7/conservatorio-santa-cecilia-maulana-malik-ibrahim-state-islamic-university-malang-gold-lorem-ipsum-is-simply-dummy-text-of-the-printing-system-png-favpng-ZMuhDyyzHaHZjz8wE34CcysFR.jpg' alt='profile'></img>
        
        </Nav.Link>

         
       
       </Nav>
     
     </Container>:<>
     <Container className="justify-content-end">
     <Nav  >
     <Nav.Link  href="/signup">Signup</Nav.Link>
     <Nav.Link href="/login" >Login</Nav.Link>
     </Nav>
     </Container>
     </>}
       
        
      </Navbar>
      
     
    </>
  );
}
export default Navigationbar;