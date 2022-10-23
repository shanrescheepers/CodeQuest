import Button from '@mui/material/Button';
import '../../../css/AwardCard.css';
import CloseIcon from '@mui/icons-material/Close';
import image from '../../../assets/awards/answers/fourth.png';
import { useNavigate } from 'react-router';

const FourthUpvoteModal = (props) => {

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
                <div className='close-con' onClick={closeModal} ><CloseIcon/></div>

                <img className='award-modal-img' src={image} alt='fourth question image'/>

                <h1>20 Points</h1>
                <p>Yay! Your answer just earned twenty points.</p>
                
                <Button sx={{
                backgroundColor: '#2b2b2b', textTransform: 'capitalize', borderRadius: '40px', marginTop: "5px", width: '100%', fontFamily: 'Open Sans',
                '&:hover': {backgroundColor: '#4A4A4A'}
                }} variant="contained" backgroundColor="primary" size='large' onClick={goHome}>Go Back Home</Button>

            </div>
        </div>
    );
}
 
export default FourthUpvoteModal;