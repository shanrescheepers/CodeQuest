import React from 'react';
import picture from '../assets/modalAssets/logOut.png'
import '../css/modals.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const LogOutModal = (props) => {

    const closeModal = () => {
        props.close();
      }

//================================================================================================
//Log out
  const navigate = useNavigate();

  const logOut = (event) => {
    navigate('/');
    sessionStorage.clear();
}
      


    return (
        <div className='pop-up'>
            <div className='modal'>
                <div className='close'><CloseIcon sx={{fontSize:'40px'}} onClick={closeModal}/></div>
                <h1>Don't go...</h1>
                <h4>Are you sure you want to log out?</h4>
                <div className='modal-img logOut'><img src={picture}></img></div>

                <Button sx={{
                backgroundColor: '#2b2b2b', borderRadius: '20px',textTransform: 'capitalize', marginTop: "25px", width: '95%', height: '45px', fontFamily: 'Open Sans', marginLeft: '0px',
                '&:hover': {
                backgroundColor: '#4A4A4A',
                }
            }} variant="contained" type="submit" backgroundColor="primary" onClick={logOut} >Log Out</Button>

            <Button sx={{
                backgroundColor: '#f1f1f1', textTransform: 'capitalize', color:"#2b2b2b",  borderRadius: '20px', marginTop: "15px", width: '95%', height: '45px', fontFamily: 'Open Sans', marginLeft: '0px',
                '&:hover': {
                backgroundColor: '#4A4A4A',
                color:"#f1f1f1"
                }
            }} variant="contained" type="submit" backgroundColor="primary" onClick={closeModal} >Cancel</Button>
            </div>
        </div>
    );
};

export default LogOutModal;