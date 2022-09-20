import React from 'react';
import '../css/Login.css';
import loginImg from '../assets/loginImg.png';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {

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
        <div className="Login">
        <ThemeProvider theme={theme} >
            <div className='login-container'>
                <h1>Hey...</h1>
                <h1>We missed you.</h1>
                <h4>Let's make some magic.</h4>

                <TextField sx={{
                    backgroundColor: '#ffffff',
                    border: 'none',
                    outlineColor: '#ffffff',
                    borderRadius: '30px',
                    width: '100%',
                    height: '50px',
                    marginTop: '30px'
                    
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
                id="outlined-basic" color='primary'  type="password" label="Password" variant="outlined" />

                <a href='' className='link'><p>Forgot your password?</p></a>

                <Button sx={{
            backgroundColor: '#2b2b2b', borderRadius: '20px', marginTop: "20px", width: '100%', fontFamily: 'Open Sans', marginLeft: '0px',
            '&:hover': {
              backgroundColor: '#FF983A',
            }
          }} variant="contained" backgroundColor="primary">Log In</Button>
          
          <p className='signIn-Op'>Don't have an account?<a href='/RegisterPage'>Sign in</a></p>

            </div>

            <img src={loginImg} className="loginImg"></img>
            
        </ThemeProvider>
        </div>
    );
};

export default LoginPage;