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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {TbArrowBigTop} from 'react-icons'

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

//=====================================================================
//Upvote and downvote
    //====================================================================
    //Format votes

    let upVotes = props.upvotes;
    let downVotes = props.downvotes;

const [voteCast, setVoteCast] = useState('');
const [upVoteCast, setUpvoteCast] = useState(props.upvotes);
const [downVoteCast, setDownvoteCast] = useState(props.downvotes);

const [arrowImgUp, setArrowImgUp] = useState('Up');
const [arrowImgDown, setArrowImgDown] = useState('Down');
  const handleVote = (event, vote) => {
    setVoteCast(vote);
    console.log(vote);

    if(vote ==='up'){
        setUpvoteCast(props.upvotes +1);
        setDownvoteCast(props.downvotes);
        setArrowImgUp('UpActive');
        setArrowImgDown('Down');
    }else if(vote ==='down'){
        setDownvoteCast(props.downvotes +1); 
        setUpvoteCast(props.upvotes);
        setArrowImgUp('Up');
        setArrowImgDown('DownActive'); 
    }else{
        setDownvoteCast(props.downvotes); 
        setUpvoteCast(props.upvotes);
        setArrowImgUp('Up');
        setArrowImgDown('Down'); 
    }
  };

  let displayUpVote = upVoteCast;
  if(displayUpVote>9){
    displayUpVote = displayUpVote
  }else{
    displayUpVote = '0' + displayUpVote
  }

  let displayDownVote = downVoteCast;
  if(displayDownVote>9){
    displayDownVote = displayDownVote
  }else{
    displayDownVote = '0' + displayDownVote
  }
 

//UpVote
    const addVote = () => {
        console.log("It works, Whoopieee");

        let payloadData={
            vote: 'upvote',
            userId: sessionStorage.getItem('id'),
            questionId: props.questionId
        }

        axios.post('http://localhost:5000/api/addvote', payloadData)
        .then((res)=> {
            if(res){
            console.log("Vote Added"); 
            console.log(payloadData);
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    };

    //======================================================================
    //downvote

    const [downClickVote, setDownClickVote] = useState(props.downvotes);

    const subtractVote = () => {
        console.log("It works, Whoopieee");

        let payloadData={
            vote: 'downvote',
            userId: sessionStorage.getItem('id'),
            questionId: props.questionId
        }
        console.log(payloadData);

        axios.post('http://localhost:5000/api/addvote', payloadData)
        .then((res)=> {
            if(res){
            console.log("Vote Added"); 
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    //===================================================================
    //Format Date date
    let date = props.date;
    let formatDate = moment(date).format('DD MMMM YYYY');


    //====================================================================
    //Cut descirption

    let desc = (props.description).substring(0,80);



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


const upImgURL = ('Votes/' + arrowImgUp + '.png');
const downImgURL = ('Votes/' + arrowImgDown + '.png');


    return (
        <>
        {/* <Link to="/IndividualQuestion"> */}
            <div className='question-con' >
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

                    <div className='user-question' onClick={goToIndividualQuestion}>
                        <h3>Q: {props.title}</h3>
                        <p>{desc} ...</p>
                    </div>

                    <div className='divider'></div>

                    <div className='bottom-block'>
                        <div className='arrow-con'>  
                        <ToggleButtonGroup
                        value={voteCast}
                        onChange={handleVote}
                          color="primary"
                          exclusive>                     
                        <ToggleButton onClick={addVote} value="up">

                            <img className='upvote question-card-icon' src={upImgURL}/>
                        </ToggleButton>
                            <small className='upvote-count vote-count'>{displayUpVote}</small>

                            <ToggleButton onClick={subtractVote} value="down">
                            <img className='downvote question-card-icon' src={downImgURL}/></ToggleButton>
                           <small className='downvote-count vote-count'>{displayDownVote}</small>
                           </ToggleButtonGroup>  
                        </div>

                        <small><p>00 Answers</p></small>
                    </div>
                </div>
            </div>
            {/* </Link> */}
            </>
    );
}

export default QuestionCard;