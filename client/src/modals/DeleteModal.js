import React from 'react';
import picture from '../assets/modalAssets/delete.png'
import '../css/modals.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

// import { useState, useEffect } from "react";
import Axios from 'axios';

const DeleteModal = (props) => {


    const deleteQuestion = () => {

        console.log(props.questionId)

        Axios.delete('http://localhost:5000/api/deletequestion/' + props.questionId)
            .then((res) => {
                if (res) {
                    // props.render(true);

                    closeModal();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }




    const closeModal = () => {
        props.close();
    }
    return (
        <div className='deleteQuestionPop'>
            <div className='deleteQProfile'>
                
                <h1>Are you sure?</h1>
               
                <Button onClick={deleteQuestion} sx={{
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

export default DeleteModal;