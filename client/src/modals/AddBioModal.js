import React, { useRef, useState } from 'react';
import editbio from '../assets/modalAssets/edit-bio.png'
import '../css/modals.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField';
import Axios from 'axios';

const AddBioModal = (props) => {

    // console.log(props);
    const userId = sessionStorage.getItem("id");

    let userBio = ['description'];
    const [userBioDescription, setUserBioDescription] = useState(userBio);

    const getBio = (e) =>{
        const { name, value } = e.target;
        setUserBioDescription({ ...userBio, [name]: value });
    }

    //add bio
    const addNewBio = () => {
        let payload = {
            userBioId: userId,
            description: userBioDescription['description']
        }

        console.log(payload);

        Axios.post('http://localhost:5000/api/addbio', payload)
        .then((res)=> {
            if(res){
            console.log("User bio has successfully been added");
            props.close();
            props.addRender(true);
            }
        })
        .catch((err) => {
            console.log("Bio could not be added. Error:" + err);
        });
    }

    const closeModal = () => {
        props.close();
    }

    return (
        <div className='pop-up'>
            <div className='modal'>
                <div className='close' onClick={closeModal}> 
                    <CloseIcon sx={{fontSize: '40px'}} onClick={closeModal}/>
                </div>

                <h1>Add a Bio!</h1>
                <h4>Please tell us more about yourself, we'd love to learn more about you!</h4>
                <div className='modal-img'><img src={editbio}></img></div>

                <Box sx={{ minWidth: 200, width: "100%", margin: "20px" }}>

                    <FormControl fullWidth>
                        <TextField name='description' onChange={getBio} placeholder='Description' multiline color='grey' fullWidth sx={{
                            backgroundColor: 'white',
                            borderRadius: '50px',
                            marginTop: '-5px',
                            marginBottom: '0px',
                            marginLeft: '-20px'
                        }}/>

                        <Button onClick={addNewBio} sx={{
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
                        }} variant="contained" type="submit" backgroundColor="primary">Add New Bio</Button>
                    </FormControl>
                </Box>

            </div>
        </div>
    );
};

export default AddBioModal;