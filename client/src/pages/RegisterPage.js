import React from 'react';
import '../css/Register.css';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import registerImg from '../assets/registerImg.png'

const RegisterPage = (props) => {

    //Hide Navigation
    props.funcNav(false);

    //Theme
    const theme = createTheme({
        palette: {
          primary: {
            // Purple and green play nicely together.
            main:'#2b2b2b',
          },
          secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
          },
        },
      });

    return (
        <ThemeProvider theme={theme}  className='SignIn'>
            <div className='SignIn-container'>
                <h1>Welcome to CodeQuest!</h1>
                <h4>Let's make some magic.</h4>
           

            
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
                id="outlined-basic" color='primary' label="Username" variant="outlined" />

                
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
                id="outlined-basic" color='primary' label="Email Address" variant="outlined" />

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
                id="outlined-basic"  type="password" color='primary' label="Password" variant="outlined" />

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
                id="outlined-basic" type="password" color='primary' label="Confirm Password" variant="outlined" />


        <Button sx={{
            backgroundColor: '#2b2b2b', borderRadius: '20px', marginTop: "20px", width: '100%', fontFamily: 'Open Sans', marginLeft: '0px',
            '&:hover': {
              backgroundColor: '#FF983A',
            }
          }} variant="contained" backgroundColor="primary">Sign In</Button>
          
          <p className='signIn-Op'>Already have an account?<a href='/LoginPage'>Log in</a></p>

             </div>

             <img src={registerImg} className="registerImg"></img>
        </ThemeProvider>
    );
};

export default RegisterPage;