// Service Example

// const axios = require('axios');

// export class UserService {
//     checkUser = (email, password) => {
//     }
// } 
// import Navigation from '../components/Navigation';

import '../css/HomeFeed.css';
import React from 'react';
import { Button } from '@mui/material';
import headerImg from '../assets/homeAssets/header-img.png';
import QuestionCard from '../components/QuestionCard';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router';
import Helmet from "react-helmet";
import axios from 'axios';
import { useState, useEffect } from 'react';

const FeedPage = (props) => {

    const buttonStyle = {
        backgroundColor: '#FF7900',
        borderRadius: '50px',
        height: '42px',
        marginTop: '16px',
        width: 'auto',
        padding: '16px 24px',
        fontFamily: 'Open Sans',
        textTransform: 'capitalize',
        '&:hover': {
            background: 'FF7900',
            color: '#2B2B2B'
        }
    }

    const secondaryButtonStyle = {
        backgroundColor: '#2B2B2B', 
        borderRadius: '50px',
        height: '45px',
        width: 'auto',
        padding: '16px 24px',
        fontFamily: 'Open Sans',
        textTransform: 'capitalize',
        '&:hover': {
            background: 'FF7900',
            color: '#2B2B2B'
        }
    }

//=====================================================================================
//Ask New Question

    const navigate = useNavigate();

    const askNewQuestion = () => {
        navigate('/newquestion')
    }

props.funcNav(true);

//========================================================================================
//Display Recent Questions

//read products
const [questions, setQuestions] = useState();
const [updateQuestions, setUpdateQuestions] = useState();

useEffect(()=>{

  axios.get('http://localhost:5000/api/readquestions')
  .then(res =>{

    let questionData = res.data;
    // console.log(questionData);
    let newArray =[];
    for (let i = Math.max(0,questionData.length-10); i < questionData.length; i++) { 
        newArray.push(questionData[i])
    }

    // console.log(newArray);

    let renderQuestions = newArray.map((item) => <QuestionCard key={item._id} questionId={item._id} date={item.datePosted} title={item.title} description={item.description} upvotes={item.upvotes} downvotes={item.downvotes} userId={item.userId}  editRender={setUpdateQuestions}/>)
    setQuestions(renderQuestions);
    setUpdateQuestions(false);

  })
  .catch(err => 
    console.log(err)
);

},[updateQuestions]);


    return (
        <>
        <motion.div className='home-con'
             initial={{ width: 0 }}
             animate={{ width: "76%" }}
             exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        >
            <Helmet>
                <title>Home</title>
            </Helmet>
           
        
            <div className='feed-header'>
                <div className='header-con'>
                    <div className='home-header-text'>
                        <h1>The Quest for Code Awaits...</h1>
                        <p>Struggling with your code? Don't worry, we've all been there before. The CodeQuest community is here to help! </p>
                        <Button variant='contained' disableElevation style={buttonStyle} onClick={askNewQuestion}>Ask a Question</Button>
                    </div>
                    <img className='home-header-image' src={headerImg} />
                </div>
            </div>

            <div className='title-con'>
                <h2>Recent Questions</h2>
                <Button variant='contained' disableElevation style={secondaryButtonStyle} onClick={askNewQuestion}>Ask a Question</Button>
            </div>

            <div className='question-card-con'>
                {questions}
            </div>

        </motion.div>
        </>
    );
};

export default FeedPage;