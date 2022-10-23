import React from 'react';
import picture from '../assets/modalAssets/delete.png'
import '../css/modals.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const DeleteAnswerModal = (props) => {
    const closeModal = () => {
        props.close();
    }
    return (
        <div className='pop-up'>
            <div className='modal'>
                <div className='close'><CloseIcon sx={{ fontSize: '40px' }} onClick={closeModal} /></div>
                <h1>Are you sure?</h1>
                <h4>Remember once you delete this answer, it will be gone for good!</h4>
                <div className='modal-img delete'><img src={picture} ></img></div>

                <Button sx={{
                    backgroundColor: '#2b2b2b', textTransform: 'capitalize', borderRadius: '20px', marginTop: "25px", width: '95%', height: '45px', fontFamily: 'Open Sans', marginLeft: '0px',
                    '&:hover': {
                        backgroundColor: '#4A4A4A',
                    }
                }} variant="contained" type="submit" backgroundColor="primary">Delete</Button>

                <Button sx={{
                    backgroundColor: '#f1f1f1', textTransform: 'capitalize', color: "#2b2b2b", borderRadius: '20px', marginTop: "15px", width: '95%', height: '45px', fontFamily: 'Open Sans', marginLeft: '0px',
                    '&:hover': {
                        backgroundColor: '#4A4A4A',
                        color: "#f1f1f1"
                    }
                }} variant="contained" type="submit" backgroundColor="primary" onClick={closeModal}>Cancel</Button>
            </div>
        </div>
    );
};

export default DeleteAnswerModal;