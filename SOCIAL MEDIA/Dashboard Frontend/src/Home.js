
import './App.css';
 import { Button} from 'react-bootstrap';
  import { useNavigate } from "react-router-dom";
 import './Home.css';

function Home() {
 const navigate=useNavigate();

  return (
    
    
    <div className='create-container' >
   
      <h1 style={{fontFamily:"fantasy"}}>Wel - Come </h1>
      <h1 style={{fontFamily:"fantasy"}}>to</h1>
      <h1 style={{fontFamily:"fantasy"}}>Blog Dashboard</h1>
     
      <Button className='btn' variant='outline-dark' onClick={()=>navigate("/create")} >NEXT</Button>
     
    </div>
    
   
  );
}

export default Home;