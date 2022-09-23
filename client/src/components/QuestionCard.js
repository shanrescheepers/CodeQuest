import '../css/QuestionCard.css';
import profilePic from '../assets/homeAssets/profile-pic.png'
import { DeleteOutline } from '@mui/icons-material';
import { ForwardOutlined } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const QuestionCard = () => {
    return (
        <div className='question-con'>
            <div className='question-con-content'>
                <div className='top-block'>
                    <div className='user-info-block'>
                        <img className='profile-pic' src={profilePic} />
                        <div className='user-info'>
                            <h4>Username</h4>
                            <p>00 September 2022</p>
                        </div>
                    </div>

                    <div className='delete-button'>
                        <DeleteOutline fontSize='large' sx={{ margin: 'auto' }} />
                    </div>

                </div>

                <NavLink activeclassname="active" to="/IndividualQuestion">
                <div className='question'>
                    <h2>Q: Is this a question?</h2>
                </div>
                </NavLink>
                <div className='divider'></div>

                <div className='bottom-block'>
                    <div className='arrow-con'>
                        <div className='upvote'>
                            <ForwardOutlined fontSize='large' sx={{ margin: 'auto' }} />
                        </div>

                        <small>00</small>

                        <div className='downvote'>
                            <ForwardOutlined fontSize='large' sx={{ margin: 'auto' }} />
                        </div>
                        <small>00</small>

                    </div>

                    <small><p>00 Answers</p></small>
                </div>
            </div>
        </div>
    );
}

export default QuestionCard;