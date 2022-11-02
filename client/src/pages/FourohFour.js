import React from "react";
import { motion } from "framer-motion";
import '../scss/fourohfour.scss';
import FourOhFourLottie from "../components/lotties/FourOhFourLottie";
import Helmet from "react-helmet";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const FourOhFour = (props) => {

    //=====================================================================================

    //Hide Navigation
    props.funcNav(false);


    //===============================================
    const buttonStyle = {
        backgroundColor: '#FF7900',
        borderRadius: '50px',
        height: '42px',
        marginTop: '16px',
        width: '150px',
        padding: '16px 24px',
        fontFamily: 'Open Sans',
        textTransform: 'capitalize',
        '&:hover': {
            background: 'FF7900',
            color: '#2B2B2B'
        }
    }


    //Go to feed page

    const navigate = useNavigate();


    const toHome = () => {
        navigate('/FeedPage');
    }

    return (
        <div>

            <motion.div className='fourohfour-container'
                intital={{ width: 0 }}
                animate={{ width: "76.8%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
            >

                <Helmet>
                    <title>404</title>
                </Helmet>

                <div className="fourohfour">
                    <div className='fourohfour__coolcat'>
                        <h1 className='fourohfour__coolcat__h1'>404</h1>
                        <h1 className='fourohfour__coolcat__h2'>Oh Snap!</h1>
                        <p className='fourohfour__coolcat__p'>Looks like this page does not exist. You can watch this cat play with this box over and over again or go back home and find what you were really looking for.</p>
                        <Button variant='contained' disableElevation style={buttonStyle} onClick={toHome}>Back Home</Button>




                    </div>
                    <div className='fourohfour__lottie'>
                        <FourOhFourLottie />
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default FourOhFour;