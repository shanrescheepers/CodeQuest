import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";

const Auth = () => {

  const [searchParams] = useSearchParams();
  const [welcome, setWelcome] = useState();
  const [message, setMessage] = useState();
 
  useEffect(()=>{

    axios.patch('http://localhost:5000/api/validate/' + searchParams.get('id'))
    .then((res)=>{
      console.log(res.data);

      if(res.data.success){
        setWelcome("Welcome " + res.data.user);
        setMessage("Your account has been verified successfully, you may now login!")
      }else{
        setWelcome("Account not verfied!");
        setMessage("Unfortunately something went wrong! Please contact a system admin")

      }
    })

    .catch()

  },[]);

  return (
    <div>
      <h1>{welcome}</h1>
      <p>{message}</p>

      {/* add button to redirect */}

    
    </div>
  )
}

export default Auth
