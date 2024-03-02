import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const LandingPage = () =>{
  const navigateTo = useNavigate();
  const handleButtonClick = () =>{
    navigateTo('/login');
  }
  return (
    <div>
      LandingPage
      <Button onClick={()=>{handleButtonClick()}}>Click Me</Button>
    </div>
    
  )
}

export default LandingPage;