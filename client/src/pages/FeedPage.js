// Service Example

// const axios = require('axios');

// export class UserService {
//     checkUser = (email, password) => {
//     }
// } 
// import Navigation from '../components/Navigation';
import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'



const FeedPage = () => {


//======================================================
//verify User

// const navigate = useNavigate();

// useEffect(()=>{

//     let verifyUser = {token: sessionStorage.getItem('token')};
//     if(!verifyUser.token){
//       navigate('/');
//       sessionStorage.clear();
//     }else{
//       Axios.post('http://localhost:5000/api/verifytoken', verifyUser)
//       .then(res =>{
//         console.log(res.data);
//         if(res.data.verified === false){
//           navigate('/LoginPage');
//           sessionStorage.clear();
  
//         }
//       })
//     }
  
//   }, []);


    return (
        <div>
            {/* <Navigation/> */}

        </div>
    );
};

export default FeedPage;