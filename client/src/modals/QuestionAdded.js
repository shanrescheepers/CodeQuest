import React from 'react';
import picture from '../assets/modalAssets/questionAdded.png'
import '../css/modals.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const QuestionAdded = () => {
    return (
        <div className='pop-up'>
            <div className='modal questionAdded'>
                <div className='close'><CloseIcon sx={{fontSize:'40px'}}/></div>
                <h1>Whoop Whoop!</h1>
                <h4>Your question has been added! Now all that's left to do is sit back, and wait ...</h4>
                <div className='modal-img delete'><img src={picture}></img></div>

                <Button sx={{
                backgroundColor: '#2b2b2b', textTransform: 'capitalize',borderRadius: '20px', marginTop: "25px", width: '95%', height: '45px', fontFamily: 'Open Sans', marginLeft: '0px',
                '&:hover': {
                backgroundColor: '#4A4A4A',
                }
            }} variant="contained" type="submit" backgroundColor="primary">Back to Home</Button>
        </div>
        </div>
    );
};

export default QuestionAdded;