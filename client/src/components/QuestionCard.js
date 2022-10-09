import '../css/QuestionCard.css';
import profilePic from '../assets/homeAssets/profile-pic.png'
import { Link } from 'react-router-dom';
import upvote from '../assets/questionCardAssets/upvote.png';
import downvote from '../assets/questionCardAssets/downvote.png';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router';

const QuestionCard = (props) => {

    const navigate = useNavigate();

    //navigate to individual question page
    const goToIndividualQuestion = () => {
        navigate('/IndividualQuestion');
        
        //send question id to session storage
        sessionStorage.setItem('questionId', props.questionId);
    }

    const deleteQuestion = () => {
        //delete question functionality
    }

    const addVote = () => {
        //add vote functionality
    }

    const subtractVote = () => {
        //subtract vote functionality
    }

    //===================================================================
    //Format Date date
    let date = props.date;
    let formatDate = moment(date).format('DD MMMM YYYY');


    //====================================================================
    //Cut descirption

    let desc = (props.description).substring(0,80);


    //====================================================================
    //Format votes

    let upVotes = props.upvotes;
    if(upVotes>9){
        upVotes = props.upvotes;
    }else{
        upVotes = '0' + upVotes;
    }

    let downVotes = props.downvotes;
    if(upVotes>9){
        downVotes = props.downvotes;
    }else{
        downVotes = '0' + downVotes;
    }
    //=====================================================================
    //User Info

    const [username, setUsername] = useState();
    const [rank, setRank] = useState();
    const [profileImg, setprofileImg] = useState();
    const [year, setYear] = useState();

useEffect(() => {

  if (props.userId == null) {
    console.log("User not logged in")

  } else {
    console.log("user logged in")
    axios.get('http://localhost:5000/api/userInfo/' + props.userId)
      .then(res => {
        let data = res.data;
        setUsername(data.username);
        setRank(data.rank);
        setprofileImg(data.profileimage);
        setYear(data.yearlevel);
        console.log(data.rank)
      })
  }
  // localStorage.clear();
}, []);

//get profile image path
const imgURL = ('Avatars/' + profileImg + '.png');

console.log(year);
let bgColor = '';

if (year === 1) {
  bgColor = '#6EEB83'
} else if (year === 2) {
  bgColor = '#6CD4FF'
} else {
  bgColor = '#FF7900'
};

    return (
        <Link to="/IndividualQuestion">
            <div className='question-con' onClick={goToIndividualQuestion}>
                <div className='question-con-content'>
                    <div className='top-block'>
                        <div className='user-info-block'>
                        <div className='profile-circle question' style={{ backgroundColor: bgColor }}><img src={imgURL} className="profile-Img question"></img></div>
                            <div className='user-info'>
                                <h4>{username}</h4>
                                <p>{formatDate}</p>
                            </div>
                        </div>

                        <div className='delete-button question-card-icon' onClick={deleteQuestion}>
                        <OutlinedFlagIcon fontSize="large"/>
                        </div>
                    </div>

                    <div className='user-question'>
                        <h3>Q: {props.title}</h3>
                        <p>{desc} ...</p>
                    </div>

                    <div className='divider'></div>

                    <div className='bottom-block'>
                        <div className='arrow-con'>                         
                            <img className='upvote question-card-icon' onClick={addVote} src={upvote}/>
                            <small className='upvote-count vote-count'>{upVotes}</small>

                            <img className='downvote question-card-icon' onClick={subtractVote} src={downvote}/>
                            <small className='downvote-count vote-count'>{downVotes}</small>
                        </div>

                        <small><p>00 Answers</p></small>
                    </div>
                </div>
            </div>
            </Link>
    );
}

export default QuestionCard;