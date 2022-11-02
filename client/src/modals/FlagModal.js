import React, { useRef, useState } from 'react';
import picture from '../assets/modalAssets/flag.png'
import '../css/modals.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField';
import Axios from 'axios';

const FlagModal = (props) => {
    const [reasonValue, setReasonValue] = useState()
    const reason = useRef("");
    const userId = sessionStorage.getItem("id");

    const flag = () => {
        console.log("Props ID", props.questionId);
        // console.log(props.userId);
        // console.log(reasonValue);

        let payloadData = new FormData();

        let payload = {
            questionId: props.questionId,
            reportedUserId: props.userId,
            reportingUserId: userId,
            flagReason: reasonValue,
        }
        payloadData = JSON.stringify(payload);

        Axios.post('http://localhost:5000/api/addReportedUser', payload)
            .then((res) => {
                if (res) {
                    closeModal()
                }

            }).catch(function (error) {
                console.log(error);
            })
    }

    const closeModal = () => {
        props.close();
    }
    return (
        <div className='pop-up' style={{ marginBottom: "100px", position: "fixed" }}>
            <div className='modal deleteAccount'>
                <div className='close' onClick={closeModal}><CloseIcon sx={{ fontSize: '40px' }} /></div>
                <h1>Flag alert.</h1>
                <h4>Uh-Oh! What was the problem with this post?</h4>
                <div className='modal-img delete'><img src={picture}></img></div>

                <Box sx={{ minWidth: 200, width: "100%", margin: "20px" }}>

                    <FormControl fullWidth>
                        <TextField name='description' placeholder='Description' multiline color='grey' fullWidth value={reasonValue} onChange={(e) => setReasonValue(e.target.value)} sx={{
                            backgroundColor: 'white',
                            borderRadius: '50px',
                            marginTop: '-5px',
                            marginBottom: '0px',
                            marginLeft: '-20px'
                        }} />


                        <Button onClick={() => flag()} sx={{
                            backgroundColor: '#2b2b2b',
                            borderRadius: '20px',
                            marginTop: "20px",
                            textTransform: 'capitalize',
                            width: '95%',
                            height: '45px',
                            fontFamily: 'Open Sans',
                            marginLeft: '-15px',
                            '&:hover': {
                                backgroundColor: '#4A4A4A',
                            }
                        }} variant="contained" type="submit" backgroundColor="primary">Flag Post</Button>
                    </FormControl>
                </Box>

            </div>
        </div>
    );
};

export default FlagModal;