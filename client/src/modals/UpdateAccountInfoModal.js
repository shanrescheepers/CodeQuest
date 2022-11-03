import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Axios from 'axios';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../css/Register.css';
import '../css/modals.css';

const UpdateAccountInfoModal = (props) => {

//=====================================================================================
//get profile pic value

const [activeButton, setActiveButton] = useState(props.profileImg);

function profilePicValue(value){
  // console.log(value);
  setActiveButton(value) //update your current active button state 
  // console.log(activeButton);
}

//=====================================================================================
//Register Functionality

let firstVals = {
    profileImg: props.profileImg,
    username: props.username,
}
//Get Form values

const [formValues, setFormValues] = useState(firstVals);

const updateValues = (e) =>{
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
}

const updateUserInfo = (e) => {
        e.preventDefault(); 
    
        let payload = {
            userId: props.userId,
            username: formValues['username'],
            profileImg: activeButton,
        }
    
        console.log(payload);

        let userId = props.userId;
    
        Axios.patch('http://localhost:5000/api/updateUser', payload)
        .then((res)=> {
            if(res){
            console.log("User Successfully Updated");
            console.log(res);
            sessionStorage.setItem('token', res.data.username);
            props.close();
            }
        })
        .catch(function (error) {
            console.log("Could not add user: Error is:" + error);
        });
    
    };
    
        const closeModal = () =>{
            props.close();
            }

    

    return (
        <div>
            <div className='pop-up updateUser'>
                <div className='modal'>
                <div className='close'><CloseIcon sx={{ fontSize: '40px' }} onClick={closeModal} /></div>

                <h1>Time to Reinvent!</h1>
                <h4>Let's make some changes.</h4>
           
              

            <div className='Dp Styling'>
                <button className={`avatar one ${activeButton === "1" && "activeBtn"}`} value="1" onClick={e => profilePicValue(e.target.value)}></button>
                <button className={`avatar two ${activeButton === "2" && "activeBtn"}`} value="2" onClick={e => profilePicValue(e.target.value)}></button>
                <button className={`avatar three ${activeButton === "3" && "activeBtn"}`} value="3" onClick={e => profilePicValue(e.target.value)}></button>
            </div>

            <form onSubmit={updateUserInfo}>


            <TextField sx={{
                    border: '0',
                    outline: '0',
                    borderRadius: '30px',
                    width: '100%',
                    height: '50px',
                    marginTop: '35px',
                    borderBlock: 'none',
                    borderBlockColor: '#f1f1f1'
                }}
                id="outlined-basic" validators={['required']}
                errorMessages={['this field is required']}  color='primary' defaultValue={props.username} onChange={updateValues} name="username" label="Username" variant="outlined" />


                <Button  type="submit" className='signInBtn' sx={{
                backgroundColor: '#2b2b2b', textTransform: 'capitalize', color: "#ffffff", borderRadius: '20px', marginTop: "25px", width: '95%', height: '45px', fontFamily: 'Open Sans', marginLeft: '0px',
                '&:hover': {
                    backgroundColor: '#4A4A4A',
                    color: "#f1f1f1"
                }
            }} variant="contained" backgroundColor="primary">
                    Make Changes
            </Button>


                    </form>


                </div>
            </div>
            
        </div>
    );
};

export default UpdateAccountInfoModal;