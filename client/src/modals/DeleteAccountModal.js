import React from 'react';
import picture from '../assets/modalAssets/deleteAccount.png'
import '../css/modals.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const DeleteAccountModal = () => {
    return (
        <div className='pop-up'>
            <div className='modal deleteAccount'>
                <div className='close'><CloseIcon sx={{fontSize:'40px'}}/></div>
                <h1>Don't leave...</h1>
                <h4>Remember once you delete your account, it will be gone for good!</h4>
                <div className='modal-img delete'><img src={picture}></img></div>

                <Button sx={{
                backgroundColor: '#2b2b2b', borderRadius: '20px', marginTop: "25px", textTransform: 'capitalize', width: '95%', height: '45px', fontFamily: 'Open Sans', marginLeft: '0px',
                '&:hover': {
                backgroundColor: '#4A4A4A',
                }
            }} variant="contained" type="submit" backgroundColor="primary">Delete Account</Button>

            <Button sx={{
                backgroundColor: '#f1f1f1', color:"#2b2b2b", textTransform: 'capitalize', borderRadius: '20px', marginTop: "15px", width: '95%', height: '45px', fontFamily: 'Open Sans', marginLeft: '0px',
                '&:hover': {
                backgroundColor: '#4A4A4A',
                color:"#f1f1f1"
                }
            }} variant="contained" type="submit" backgroundColor="primary">Cancel</Button>
            </div>
        </div>
    );
};

export default DeleteAccountModal;