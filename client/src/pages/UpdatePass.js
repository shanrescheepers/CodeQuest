import React from 'react';
import '../css/Login.css';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Helmet from "react-helmet";
import CantLoginResetModal from '../modals/CantLoginResetModal';

const UpdatePass = (props) => {

       // Handle Modal
       const [editModal, setEditModal] = useState();

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
  
  //=====================================================================================
  //Send reset email functionality


//get form vals
let defaultFormVals = ["email"];
let navigate = useNavigate();
const [formValues, setFormValues] = useState(defaultFormVals);

const getValues = (e) =>{
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
}

const sendPassReset = (e) => {
    e.preventDefault();

    let payload = {
        email: formValues['email'],
    }
    console.log(payload);

    axios.post('http://localhost:5000/api/resetpass', payload)
    .then((res)=> {
      if(res){
        console.log(res.data); 
        if(res.data.success == true){
            window.location.href = 'https://mail.google.com/mail/u/0/#inbox'; 
            navigate('https://mail.google.com/mail/u/0/#inbox')
        }else if(res.data.success == false){
            setEditModal(
                <CantLoginResetModal close={setEditModal} />
              )
        }

      }
    })
    .catch(function (error) {
      console.log(error);
      setEditModal(
        <CantLoginResetModal close={setEditModal} />
      )
    });

}

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
    </Helmet>
{editModal}
      <div className="Login">
     <ThemeProvider theme={theme} >
          <div className='email-container'>
            <h1>Reset Password</h1>
            <h4>It's okay, we've got this .</h4>

            <form onSubmit={sendPassReset} >

              <TextField sx={{
                backgroundColor: '#ffffff',
                border: 'none',
                outlineColor: '#ffffff',
                borderRadius: '30px',
                width: '100%',
                height: '50px',
                marginTop: '24px'

              }}
                id="outlined-basic" onChange={getValues} name="email" color='primary' label="Email Address" variant="outlined" />

            
              <Button sx={{
                backgroundColor: '#2b2b2b', borderRadius: '20px', marginTop: "24px", width: '100%', fontFamily: 'Open Sans', marginLeft: '0px',
                '&:hover': {
                  backgroundColor: '#FF983A',
                }
              }} variant="contained" type="submit" backgroundColor="primary">Send Reset Email</Button>


            </form>

          </div>

          {/* <img src={loginImg} className="loginImg"></img> */}

        </ThemeProvider>


      </div >
    </>
  );
};

export default UpdatePass;