import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import '../css/Auth.css';
import authImg from '../assets/authAssets/authImg.png';
import { Button } from '@mui/material';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Auth = (props) => {

//=====================================================================================
//Hide Navigation
props.funcNav(false);


//====================================================================================
//Button styling

const buttonStyle = {
    backgroundColor: '#FF7900',
    borderRadius: '50px',
    height: '42px',
    marginTop: '16px',
    width: '140px',
    padding: '16px 24px',
    fontFamily: 'Open Sans',
    textTransform: 'capitalize',
    '&:hover': {
        background: 'FF7900',
        color: '#2B2B2B'
    }
}

//====================================================================================
//Navigate to login
const navigate = useNavigate();

const toLogin =()=>{
    navigate('/');
  }
//====================================================================================
  const [searchParams] = useSearchParams();
  const [welcome, setWelcome] = useState();
  const [username, setUsername] = useState();
  const [message, setMessage] = useState();
 
  useEffect(()=>{

    axios.patch('http://localhost:5000/api/validate/' + searchParams.get('id'))
    .then((res)=>{
      console.log(res.data);

      if(res.data.success){
        setWelcome("Welcome " + res.data.user);
        setUsername(res.data.user);
        setMessage("Your account has been verified successfully, you may now login!")
      }else{
        setWelcome("Account not verfied!");
        setMessage("Unfortunately something went wrong! Please contact a system admin")

      }
    })

    .catch()

  },[]);

  return (
    <div>
      {/* <h1>{welcome}</h1>
      <p>{message}</p> */}
      <div className='auth-logo'>
        <img src={logo}></img>
      </div>

      {/* add button to redirect */}
      <div className='auth-container'>
        <div className='auth-text'>
            <h5>{welcome}</h5>
            <h1>To CodeQuest!</h1>
            <p>We're so happy to have you {username}! You can now login and officially begin your quest for code! </p>
            <p>You'll can now get the answers you need through asking questions and show off your skills by answering them! And all your hard work could lead up to a special reward... </p>
            <Button variant='contained' style={buttonStyle} onClick={toLogin} >Login Now!</Button>
        </div>
        <div className='auth-img'>
            <img src={authImg}/>
        </div>
        
      </div>

    
    </div>
  )
}

export default Auth