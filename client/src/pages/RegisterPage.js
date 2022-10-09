import React from 'react';
import '../css/Register.css';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import registerImg from '../assets/registerImg.png';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import One from '../assets/Avatars/1.png'
import Two from '../assets/Avatars/2.png'
import Three from '../assets/Avatars/3.png'
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = (props) => {

//=====================================================================================
//Get Subject Value (ie DV100)
    const [subject, setSubject] = React.useState('');

    const handleChange = (event) => {
      setSubject(event.target.value);
    };

    
//=====================================================================================
//Hide Navigation
  props.funcNav(false);


//=====================================================================================
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

//=====================================================================================
//get profile pic value

      const [activeButton, setActiveButton] = useState();

      function profilePicValue(value){
        console.log(value);
        setActiveButton(value) //update your current active button state 
        console.log(activeButton);
    }

//=====================================================================================
//Register Functionality

    const navigate = useNavigate();

    const [userId, setUserId] = useState({
      activeUser: sessionStorage.getItem('activeUser'),
  });
  

  //Get Form values
  let formVals = ["username", "email", "password"];

    const [formValues, setFormValues] = useState(formVals);

    const getValues = (e) =>{
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // if(formValues.name !== ''){setLastError();}
}

//Add new user

const addNewUser = (e) => {
    e.preventDefault(); 

    let payload = {
        username: formValues['username'],
        email: formValues['email'],
        password: formValues['password'],
        yearlevel: subject,
        profileimage: activeButton,
    }

    console.log(payload);

    Axios.post('http://localhost:5000/api/adduser', payload)
    .then((res)=> {
        if(res){
        console.log("User Successfully Added");
        console.log(res);
        sessionStorage.setItem('id', res.data._id);
        sessionStorage.setItem('token', res.data.username);
        sessionStorage.setItem('email', formValues['email']);
        navigate("/FeedPage"); 
        }
    })
    .catch(function (error) {
        console.log("Could not add user: Error is:" + error);
    });
} 

//====================================================================================
//To Login

const toLogin =()=>{
  navigate('/');
}



    return (
        <div className='SignIn'>
        <ThemeProvider theme={theme}>
            <div className='SignIn-container'>
                <h1>Welcome to CodeQuest!</h1>
                <h4>Let's make some magic.</h4>
           
              

            <div className='Dp'>
                <button className={`avatar one ${activeButton === "1" && "activeBtn"}`} value="1" onClick={e => profilePicValue(e.target.value)}></button>
                <button className={`avatar two ${activeButton === "2" && "activeBtn"}`} value="2" onClick={e => profilePicValue(e.target.value)}></button>
                <button className={`avatar three ${activeButton === "3" && "activeBtn"}`} value="3" onClick={e => profilePicValue(e.target.value)}></button>
            </div>

            <form onSubmit={addNewUser}>


            <TextField sx={{
                    border: '0',
                    outline: '0',
                    borderRadius: '30px',
                    width: '100%',
                    height: '50px',
                    marginTop: '30px',
                    borderBlock: 'none',
                    borderBlockColor: '#f1f1f1'
                }}
                id="outlined-basic" validators={['required']}
                errorMessages={['this field is required']}  color='primary' onChange={getValues} name="username" label="Username" variant="outlined" />



                <FormControl sx={{minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Subject</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={subject}
                    onChange={handleChange}
                    autoWidth
                    label="subject"
                    >
                    <MenuItem value="">
                        <em>Select your subject</em>
                    </MenuItem>
                    <MenuItem value={1}>DV100</MenuItem>
                    <MenuItem value={2}>DV200</MenuItem>
                    <MenuItem value={3}>DV300</MenuItem>
                    </Select>
                </FormControl>

                
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
                id="outlined-basic" name="email" validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']} onChange={getValues} type="email" color='primary' label="Email Address" variant="outlined" />

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
                id="outlined-basic" name="password" validators={['required', 'matchRegexp:/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/']}
                errorMessages={['this field is required', 'email is not valid']} onChange={getValues} type="password" color='primary' label="Password" variant="outlined" />

  

            <Button type="submit" className='signInBtn' sx={{
                backgroundColor: '#2b2b2b', borderRadius: '20px', marginTop: "20px", width: '100%', fontFamily: 'Open Sans', marginLeft: '0px',
                '&:hover': {
                backgroundColor: '#FF983A',
                }}} variant="contained" backgroundColor="primary">
                    Sign In
            </Button>
          
          <p className='signIn-Op' onClick={toLogin}>Already have an account?Log in</p>


          </form>
             </div>

             <img src={registerImg} className="registerImg"></img>
        </ThemeProvider>
        </div>
    );
};

export default RegisterPage;