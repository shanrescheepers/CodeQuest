import Button from '@mui/material/Button';
import '../../../css/AwardCard.css';
import CloseIcon from '@mui/icons-material/Close';
import image from '../../../assets/awards/ranks/silver.png';
import { useNavigate } from 'react-router';

const SilverRankModal = (props) => {

    const navigation = useNavigate()

    const closeModal = () => {
        props.close();
    }

    const goHome = () => {
        navigation('/FeedPage')
    }

    return (  
        <div className='overlay'>
            <div className='modal-con'>
                <div className='close-con' onClick={closeModal}><CloseIcon/></div>

                <img className='award-modal-img' src={image} alt='first question image'/>

                <h1>Silver Ball of Yarn</h1>
                <p>Congratulations! You’ve earned a silver ball of yarn, you’re amazing!</p>
                
                <Button sx={{
                backgroundColor: '#2b2b2b', textTransform: 'capitalize', borderRadius: '40px', marginTop: "5px", width: '100%', fontFamily: 'Open Sans',
                '&:hover': {backgroundColor: '#4A4A4A'}
                }} variant="contained" backgroundColor="primary" size='large' onClick={goHome}>Go Back Home</Button>

            </div>
        </div>
    );
}
 
export default SilverRankModal;