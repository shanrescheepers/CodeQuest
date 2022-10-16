import React, { useEffect, useRef } from "react";
import lottie from 'lottie-web';
import heycat from "../../lottie/heycat.json";
import { useNavigate } from 'react-router-dom';

const CatLottie = () => {
    const catlottie__container = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const animation = lottie.loadAnimation({
            container: catlottie__container.current,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: heycat,
        });

        animation.onComplete = function () {

            // console.log("complete")
            navigate('/FeedPage');
        }
    }, []);


    return (
        <div ref={catlottie__container}>
        </div>
    );
}

export default CatLottie;