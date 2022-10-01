import React from "react";
import { motion } from "framer-motion";
import '../scss/fourohfour.scss';
import FourOhFourLottie from "../components/lotties/FourOhFourLottie";


const FourOhFour = () => {
    return (
        <div>

            <motion.div className='home-con'
                intital={{ width: 0 }}
                animate={{ width: "76%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
            >

                <div className="fourohfour">
                    <div className='fourohfour__coolcat'>
                        <h1 className='fourohfour__coolcat__h1'>Hey Coolcat,</h1>
                        <p className='fourohfour__coolcat__p'> it seems as though the page you are looking for does not exist.</p>





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