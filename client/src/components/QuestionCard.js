import '../css/QuestionCard.css';
import profilePic from '../assets/homeAssets/profile-pic.png'
import { Link } from 'react-router-dom';
import upvote from '../assets/questionCardAssets/upvote.png';
import downvote from '../assets/questionCardAssets/downvote.png';
import deleteIcon from '../assets/questionCardAssets/delete.png';

const QuestionCard = () => {

    const deleteQuestion = () => {
        //delete question functionality
    }

    const addVote = () => {
        //add vote functionality
    }

    const subtractVote = () => {
        //subtract vote functionality
    }

    return (
        <Link to='/IndividualQuestion'>
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

                        <img className='delete-button question-card-icon' onClick={deleteQuestion} src={deleteIcon}/>
                    </div>

                    <div className='user-question'>
                        <h2>Q: Is this a question?</h2>
                    </div>

                    <div className='divider'></div>

                    <div className='bottom-block'>
                        <div className='arrow-con'>                         
                            <img className='upvote question-card-icon' onClick={addVote} src={upvote}/>
                            <small className='upvote-count vote-count'>00</small>

                            <img className='downvote question-card-icon' onClick={subtractVote} src={downvote}/>
                            <small className='downvote-count vote-count'>00</small>
                        </div>

                        <small><p>00 Answers</p></small>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default QuestionCard;