import React from 'react';
import picture from '../assets/modalAssets/answered.png'
import '../css/modals.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const AnsweredModal = (props) => {

    const navigate = useNavigate();

    //navigates back to home page
    const goHome = () => {
        props.close();
    }

    //close modal 
    const closeModal = () => {
        props.close();
    }

    return (
        <div className='question-added pop-up'>
            <div className='modal questionAdded answer'>
                <div className='close' onClick={closeModal}><CloseIcon sx={{fontSize:'40px'}}/></div>
                <h1>Sup Smart Stuff!</h1>
                <h4>Your answer has been added! Let's hope it helps!</h4>
                <div className='modal-img delete'><img src={picture}></img></div>

                <Button sx={{
                backgroundColor: '#2b2b2b', textTransform: 'capitalize',borderRadius: '20px', marginTop: "5px", width: '95%', height: '45px', fontFamily: 'Open Sans', marginLeft: '0px',
                '&:hover': {
                backgroundColor: '#4A4A4A',
                }
            }} variant="contained" type="submit" backgroundColor="primary" onClick={goHome}>Back to Questoin</Button>
        </div>
        </div>
    );
};

export default AnsweredModal;