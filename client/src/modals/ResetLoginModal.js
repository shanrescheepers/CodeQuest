import React from 'react';
import picture from '../assets/modalAssets/resetLogin.png'
import '../css/modals.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const ResetLoginModal = () => {


    const navigate = useNavigate();

    const GoToLogin = () => {
       navigate('/');
      }


      


    return (
        <div className='pop-up'>
            <div className='modal resetLogin'>
                <h1>Done & Dusted!</h1>
                <h4>You can now login using your new password.</h4>
                <div className='modal-img'><img src={picture}></img></div>

                <Button sx={{
                backgroundColor: '#2b2b2b', borderRadius: '20px', textTransform: 'capitalize',marginTop: "25px", width: '95%', height: '45px', fontFamily: 'Open Sans', marginLeft: '0px',
                '&:hover': {
                backgroundColor: '#4A4A4A',
                }
            }} variant="contained" type="submit" onClick={GoToLogin}  backgroundColor="primary">Go To Login</Button>

            </div>
        </div>
    );
};

export default ResetLoginModal;