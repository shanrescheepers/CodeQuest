import React from 'react';
import picture from '../assets/modalAssets/cantLogin.png'
import '../css/modals.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const CantLoginResetModal = (props) => {

    const closeModal = () => {
        props.close();
      }


      


    return (
        <div className='pop-up'>
            <div className='modal'>
                <div className='close'><CloseIcon sx={{fontSize:'40px'}} onClick={closeModal}/></div>
                <h1>Uh-Oh!</h1>
                <h4>Something went wrong! Please make sure you have typed everything correctly.</h4>
                <div className='modal-img'><img src={picture}></img></div>

                <Button sx={{
                backgroundColor: '#2b2b2b', borderRadius: '20px', textTransform: 'capitalize',marginTop: "25px", width: '95%', height: '45px', fontFamily: 'Open Sans', marginLeft: '0px',
                '&:hover': {
                backgroundColor: '#4A4A4A',
                }
            }} variant="contained" type="submit" onClick={closeModal}  backgroundColor="primary">Try Again</Button>

            <Button sx={{
                backgroundColor: '#f1f1f1', color:"#2b2b2b",  textTransform: 'capitalize',borderRadius: '20px', marginTop: "15px", width: '95%', height: '45px', fontFamily: 'Open Sans', marginLeft: '0px',
                '&:hover': {
                backgroundColor: '#4A4A4A',
                color:"#f1f1f1"
                }
            }} variant="contained" type="submit" backgroundColor="primary"  onClick={closeModal} >Cancel</Button>
            </div>
        </div>
    );
};

export default CantLoginResetModal;