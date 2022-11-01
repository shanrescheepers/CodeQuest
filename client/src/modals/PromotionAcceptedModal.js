import React from 'react';
import picture from '../assets/awards/answers/seventh.png'
import '../css/modals.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Axios from 'axios';

const PromotionAccepted = (props) => {
    const closeModal = () => {
        props.close();
    }
    const acceptRequest = () => {

        console.log("Promotion Accepted User");
        var state = true
        let payload = {
            userId: props.userId,
            requestStatus: state,
            userEmail: props.userEmail,
            reliability: props.reliability,
        }


        console.log(payload);
        Axios.patch('http://localhost:5000/api/adminreqauth/' + props.id, payload)
            .then(res => {
                // console.log("user has been removed from flagged list");
                closeModal();
            }).catch(function (error) {
                console.log(error);
            })


    }


    return (
        <div className='pop-up delete'>
            <div className='modal'>
                <div className='close'><CloseIcon sx={{ fontSize: '40px' }} onClick={closeModal} /></div>
                <h1>Are you sure?</h1>
                <h4>Once you Accept this Promotion Request, the user will be promoted to their new rank!</h4>
                <div className='modal-img delete'><img src={picture}></img></div>

                <Button sx={{
                    backgroundColor: '#2b2b2b', textTransform: 'capitalize', borderRadius: '20px', marginTop: "0px", width: '95%', height: '45px', fontFamily: 'Open Sans', marginLeft: '0px',
                    '&:hover': {
                        backgroundColor: '#4A4A4A',
                    }
                }} variant="contained" type="submit" backgroundColor="primary" onClick={() => { acceptRequest() }}>ACCEPT</Button>

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

export default PromotionAccepted;