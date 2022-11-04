import React, { useRef, useState } from 'react';
import editbio from '../assets/modalAssets/edit-bio.png'
import '../css/modals.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField';
import Axios from 'axios';

const EditBioModal = (props) => {
    console.log(props)

    let editFormBio = {description: props.description};

    const [editBio, setEditBio] = useState(editFormBio);

    const updateBioDescription = (e) =>{
        const { name, value } = e.target;
        setEditBio({ ...editBio, [name]: value });
    }

    const updateBio = (e) => {
        e.preventDefault();
        let payload = editBio;
        console.log(payload);

        Axios.patch('http://localhost:5000/api/updatebio/' + props.id, payload)
        .then((res)=> {
            if(res){
            console.log("Bio updated"); 
            props.close();
            props.editRender(true);
            }
        })
        .catch((err) => {
            console.log(err);
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

                <h1>Edit Bio</h1>
                {/* <h4></h4> */}
                <div className='modal-img'><img src={editbio}></img></div>

                <Box sx={{ minWidth: 200, width: "100%", margin: "20px" }}>

                    <FormControl fullWidth>
                        <TextField name='description' placeholder='' multiline color='grey' fullWidth  defaultValue={props.description} onChange={updateBioDescription} sx={{
                            backgroundColor: 'white',
                            borderRadius: '50px',
                            marginTop: '-5px',
                            marginBottom: '0px',
                            marginLeft: '-20px',
                        }} />

                        <Button onClick={updateBio} sx={{
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
                        }} variant="contained" type="submit" backgroundColor="primary">Update Bio</Button>
                    </FormControl>
                </Box>

            </div>
        </div>
    );
};

export default EditBioModal;