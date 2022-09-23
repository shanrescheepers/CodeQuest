// Service Example

// const axios = require('axios');

// export class UserService {
//     checkUser = (email, password) => {
//     }
// } 
// import Navigation from '../components/Navigation';

import '../CSS/HomeFeed.css';
import React from 'react';
import { Button } from '@mui/material';
import headerImg from '../assets/homeAssets/header-img.png';
import QuestionCard from '../components/QuestionCard';

import { motion} from "framer-motion";

const FeedPage = () => {

    const buttonStyle = {
        backgroundColor: '#FF7900', 
        borderRadius: '50px',
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
        width: 'auto',
        padding: '16px 24px',
        fontFamily: 'Open Sans',
        textTransform: 'capitalize',
        '&:hover': {
            background: 'FF7900', 
            color: '#2B2B2B'
        }
    }

    return (
        <motion.div className='home-con'
        intital={{width: 0}}
        animate={{width:"70%"}}
        exit={{x: window.innerWidth, transition: {duration: 0.5}}}
>
            <div className='feed-header'>
                <div className='header-con'>
                    <div className='home-header-text'>
                        <h1>The Quest for Code Awaits...</h1>
                        <p>Struggling with your code? Don't worry, we've all been there before. The CodeQuest community is here to help! </p>
                        <Button variant='contained' disableElevation style={buttonStyle}>Ask a Question</Button>
                    </div>
                    <img className='home-header-image' src={headerImg}/>
                </div>
            </div>

            <div className='title-con'>
                <h2>Questions</h2>
                <Button variant='contained' disableElevation style={secondaryButtonStyle}>Ask a Question</Button>
            </div>

            <div className='question-card-con'>
                <QuestionCard/>
                <QuestionCard/>
                <QuestionCard/>

            </div>

        </motion.div>
    );
};

export default FeedPage;