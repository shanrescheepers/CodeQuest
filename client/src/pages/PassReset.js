import React from 'react';
import '../css/Login.css';
import loginImg from '../assets/loginImg.png';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CantLoginModal from '../modals/CantLoginModal';
import CatLottie from '../components/lotties/HeyCatLottie';
import Helmet from "react-helmet";
import { useSearchParams } from 'react-router-dom';

const PassReset = (props) => {

  //=====================================================================================
  //Hide Navigation
  props.funcNav(false);
  //=====================================================================================
  //Theme
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#2b2b2b',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });
  //====================================================================================
  //To register

  const navigate = useNavigate();

  //=====================================================================================
  // functionality
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState();

  let defaultFormVals = ["password", "confirmPass"];

  const [formValues, setFormValues] = useState(defaultFormVals);

  const getValues = (e) =>{
  const { name, value } = e.target;
  setFormValues({ ...formValues, [name]: value });
}

const sendPassReset = (e) => {
  e.preventDefault();

  let payload = {
      password: formValues['password'],
      confirmPass: formValues['confirmPass']
  }

  axios.patch('http://localhost:5000/api/updatepass/' + searchParams.get('id'), payload)
  .then((res)=>{
    console.log(res.data);

    if(res.data.success){
      setMessage("Your Password has been reset!");
    } else {
      setMessage("There was a problem resetting your password ");
    }

  })
  .catch(function(error){console.log(error)});
}
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
    </Helmet>
   
      <div className="Login">
        <ThemeProvider theme={theme} >
          <div className='login-container'>
            <h1>Reset Password</h1>
            <h4>You'll be able to login in no time.</h4>

            <form onSubmit={sendPassReset}>

              <TextField sx={{
                backgroundColor: '#ffffff',
                border: 'none',
                outlineColor: '#ffffff',
                borderRadius: '30px',
                width: '100%',
                height: '50px',
                marginTop: '30px'

              }}
                id="outlined-basic" onChange={getValues} name="password" color='primary' type="password" label="Password" variant="outlined" />

              <TextField sx={{
                backgroundColor: '#ffffff',
                border: '0',
                outline: '0',
                borderRadius: '30px',
                width: '100%',
                height: '50px',
                marginTop: '30px',
                borderBlock: 'none',
                borderBlockColor: '#f1f1f1'
              }}
                id="outlined-basic" onChange={getValues} name="confirmPass" color='primary' type="password" label="Confirm Password" variant="outlined" />

             

              <Button sx={{
                backgroundColor: '#2b2b2b', borderRadius: '20px', marginTop: "20px", width: '100%', fontFamily: 'Open Sans', marginLeft: '0px',
                '&:hover': {
                  backgroundColor: '#FF983A',
                }
              }} variant="contained" type="submit" backgroundColor="primary">Reset Password</Button>


            </form>

          </div>

          {/* <img src={loginImg} className="loginImg"></img> */}

        </ThemeProvider>


      </div >
    </>
  );
};

export default PassReset;