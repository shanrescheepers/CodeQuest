import '../css/Footer.css';
import footerLogo from '../assets/footerAssets/logo.png';

import facebook from '../assets/footerAssets/facebook.png';
import instagram from '../assets/footerAssets/instagram.png';
import twitter from '../assets/footerAssets/twitter.png';

const Footer = () => {

    const goToFacebook = () => {
        window.open('https://www.facebook.com/theopenwindow/', '_blank');
    }

    const goToInstagram = () => {
        window.open('https://www.instagram.com/openwindowinstitute/', '_blank');
    }

    const goToBirdApp = () => {
        window.open('https://twitter.com/open_window_', '_blank');
    }

    return (  
        <div className='footer'>
            <img src={footerLogo} className='footer-logo'></img>
            <p> <small> ©2022 CodeQuest. All rights reserved. </small> </p>

            <div className='footer-icons'>
                <div className='footer-icon-con' onClick={goToFacebook}>
                    <img src={facebook}  className='footer-icon'/>
                </div>

                <div className='footer-icon-con' onClick={goToInstagram}>
                    <img src={instagram}  className='footer-icon'/>
                </div>

                <div className='footer-icon-con' onClick={goToBirdApp}>
                    <img src={twitter}  className='footer-icon'/>
                </div>
            </div>

        </div>
    );
}
 
export default Footer;