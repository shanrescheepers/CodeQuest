import React, { useEffect, useRef } from "react";
import lottie from 'lottie-web';
import fourohfour from "../../lottie/404lottie.json";
import { useNavigate } from 'react-router-dom';
import '../../../src/scss/lottie.scss';
const FourOhFourLottie = () => {
    const fourohfourlottie__container = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const animation = lottie.loadAnimation({
            container: fourohfourlottie__container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: fourohfour,
        });

    }, []);


    return (
        <div ref={fourohfourlottie__container} className="lottie" />

    );
}

export default FourOhFourLottie;