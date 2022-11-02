import React from "react";
import "../css/IndividualQuestion.css";
import "../css/profilePage.css";
import $ from "jquery";
import questionImage from "../assets/individualPageAssets/QuestionImg.png";
import UpVote from "../assets/profilePageAssets/upVote.png";
import DownVote from "../assets/profilePageAssets/downVote.png";
import flagQuestion from "../assets/individualPageAssets/questionFlag.png";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Highlight from 'react-highlight';
import "../css/code.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FlagModal from "../modals/FlagModal";
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import {Button} from "@mui/material";

export const IndividualQuestionCard = (props) => {
  const [index, setIndex] = useState(0);
  const qScreenshots = props.screenshots;

  console.log(qScreenshots);

  let screenshots = [];

  for (let i = 0; i < qScreenshots.length; i++) {
    let URLs = 'http://localhost:5000/questionScreenshots/' + qScreenshots[i].filename;
    screenshots.push(URLs);
  }

  function AnswerQuestion() {
    // console.log("something");
    $(".answer_question").fadeIn();
  }

  const navigate = useNavigate();
  function AnswerQuestion() {
    // console.log("something");
    $(".answer_question").fadeIn();
  }
  //navigate to individual question page
  const goToIndividualQuestion = () => {
    navigate("/IndividualQuestion");

    //send question id to session storage
    sessionStorage.setItem("questionId", props.questionId);
  };

  // Flaf Funct
  const [flagModal, setFlagModal] = useState()


  const flagQuestion = () => {
    setFlagModal(<FlagModal close={setFlagModal} id={props.id} questionId={props.questionId} userId={props.userId} />)
  }
  const [flagState, setFlagState] = useState(false)
  const userId = sessionStorage.getItem("id");
  useEffect(() => {
    axios.get('http://localhost:5000/api/reportedPost/' + props?.questionId + "/" + userId)
      .then(res => {
        let data = res.data;
        console.log(data);
        setFlagState(data)

      })
      .catch(function (error) {
        console.log(error);
      });

  }, [flagModal]);


  //=====================================================================
  //Get Current Vote state

  const [arrowImgUp, setArrowImgUp] = useState('Up');
  const [arrowImgDown, setArrowImgDown] = useState('Down');
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/readvote')
      .then(res => {
        let data = res.data;
        console.log(data);
        let user = sessionStorage.getItem('id');

        for (let i = 0; i < data.length; i++) {
          if (props.questionId === data[i].questionId) {

            // console.log(user, data[i].userId);
            if (user === data[i].userId) {
              console.log("should work");
              if (data[i].vote === 'upvote') {
                setArrowImgUp('UpActive');


                setArrowImgDown('Down')
                setCategory('startUp')
              } else if (data[i].vote === 'downvote') {
                setArrowImgDown('DownActive')
                setArrowImgUp('Up');
                setCategory('startDown')
              };
              console.log("not happening");

            } else {
              console.log('N/A');
            }


          } else {
            // console.log('not relevent');
          }

        }

      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);




  //=====================================================================
  //Upvote and downvote

  let upVotes = props.upvotes;
  let downVotes = props.downvotes;

  const [voteCast, setVoteCast] = useState('');
  const [upVoteCast, setUpvoteCast] = useState(props.upvotes);
  const [downVoteCast, setDownvoteCast] = useState(props.downvotes);


  const handleVote = (event, vote) => {
    setVoteCast(vote);
    // console.log(vote);
    // console.log("category", category);
    // console.log("arrowImgUp",arrowImgUp);
    // console.log("arrowImgDown",arrowImgDown);

    if (category === 'startUp' && arrowImgUp === 'UpActive' && arrowImgDown === 'Down') {
      console.log("Up vote again");
      if (vote === null) {
        console.log("Did do null");
        setUpvoteCast(props.upvotes - 1);
        setDownvoteCast(props.downvotes);
        setArrowImgUp('Up');
        setArrowImgDown('Down');
      } else if (vote === 'down') {
        setDownvoteCast(props.downvotes + 1);
        setUpvoteCast(props.upvotes - 1);
        setArrowImgUp('Up');
        setArrowImgDown('DownActive');
      } else if (vote === 'up') {
        console.log("Did do null");
        setUpvoteCast(props.upvotes - 1);
        setDownvoteCast(props.downvotes);
        setArrowImgUp('Up');
        setArrowImgDown('Down');
      }
    };
    if (category === 'startUp' && arrowImgUp === 'Up' && arrowImgDown === 'Down') {
      if (vote === 'up') {
        setUpvoteCast(props.upvotes);
        setDownvoteCast(props.downvotes);
        setArrowImgUp('UpActive');
        setArrowImgDown('Down');
      } else if (vote === 'down') {
        setDownvoteCast(props.downvotes + 1);
        setUpvoteCast(props.upvotes - 1);
        setArrowImgUp('Up');
        setArrowImgDown('DownActive');
      }
    };
    if (category === 'startUp' && arrowImgUp === 'Up' && arrowImgDown === 'DownActive') {
      if (vote === 'up') {
        console.log("Unvote");
        setUpvoteCast(props.upvotes);
        setDownvoteCast(props.downvotes);
        setArrowImgUp('UpActive');
        setArrowImgDown('Down');
      } else if (vote === null) {
        console.log("Unvote");
        setDownvoteCast(props.downvotes);
        setUpvoteCast(props.upvotes - 1);
        setArrowImgUp('Up');
        setArrowImgDown('Down');
      }
    };

    //start down

    if (category === 'startDown' && arrowImgUp === 'Up' && arrowImgDown === 'Down') {
      if (vote === 'up') {
        setUpvoteCast(props.upvotes + 1);
        setDownvoteCast(props.downvotes - 1);
        setArrowImgUp('UpActive');
        setArrowImgDown('Down');
      } else if (vote === 'down') {
        setDownvoteCast(props.downvotes);
        setUpvoteCast(props.upvotes);
        setArrowImgUp('Up');
        setArrowImgDown('DownActive');
      }
    };

    if (category === 'startDown' && arrowImgUp === 'UpActive' && arrowImgDown === 'Down') {
      if (vote === null) {
        setUpvoteCast(props.upvotes - 1);
        setDownvoteCast(props.downvotes - 1);
        setArrowImgUp('Up');
        setArrowImgDown('Down');
        console.log('active to nuet');
      } else if (vote === 'down') {
        setDownvoteCast(props.downvotes);
        setUpvoteCast(props.upvotes);
        setArrowImgUp('Up');
        setArrowImgDown('DownActive');
      }
    };

    //start down

    if (category === 'startDown' && arrowImgUp === 'Up' && arrowImgDown === 'DownActive') {
      if (vote === 'up') {
        setUpvoteCast(props.upvotes + 1);
        setDownvoteCast(props.downvotes - 1);
        setArrowImgUp('UpActive');
        setArrowImgDown('Down');
      } else if (vote === null) {
        setDownvoteCast(props.downvotes - 1);
        setUpvoteCast(props.upvotes);
        setArrowImgUp('Up');
        setArrowImgDown('Down');
      } else if (vote === 'down') {
        setDownvoteCast(props.downvotes - 1);
        setUpvoteCast(props.upvotes);
        setArrowImgUp('Up');
        setArrowImgDown('Down');
      }
    };

    if (category === 'startDown' && arrowImgUp === 'Up' && arrowImgDown === 'Down') {
      if (vote === 'up') {
        setUpvoteCast(props.upvotes + 1);
        setDownvoteCast(props.downvotes - 1);
        setArrowImgUp('UpActive');
        setArrowImgDown('Down');
      } else if (vote === 'down') {
        setDownvoteCast(props.downvotes);
        setUpvoteCast(props.upvotes);
        setArrowImgUp('Up');
        setArrowImgDown('DownActive');
      }
    };

    if (category === 'startDown' && arrowImgUp === 'UpActive' && arrowImgDown === 'Down') {
      if (vote === null) {
        setUpvoteCast(props.upvotes - 1);
        setDownvoteCast(props.downvotes - 1);
        setArrowImgUp('Up');
        setArrowImgDown('Down');
        console.log('active to nuet');
      } else if (vote === 'down') {
        setDownvoteCast(props.downvotes);
        setUpvoteCast(props.upvotes);
        setArrowImgUp('Up');
        setArrowImgDown('DownActive');
      }
    };

    //start neutral

    if (category === '' && arrowImgUp === 'Up' && arrowImgDown === 'Down') {
      if (vote === 'up') {
        setUpvoteCast(props.upvotes + 1);
        setDownvoteCast(props.downvotes);
        setArrowImgUp('UpActive');
        setArrowImgDown('Down');
      } else if (vote === 'down') {
        setDownvoteCast(props.downvotes + 1);
        setUpvoteCast(props.upvotes);
        setArrowImgUp('Up');
        setArrowImgDown('DownActive');
      }
    };

    if (category === '' && arrowImgUp === 'UpActive' && arrowImgDown === 'Down') {
      console.log("Upvote should be 0");
      console.log("vote", vote);
      if (vote === null) {
        console.log("up again");
        setUpvoteCast(props.upvotes);
        setDownvoteCast(props.downvotes);
        setArrowImgUp('Up');
        setArrowImgDown('Down');
        console.log('active to nuet');
      } else if (vote === 'down') {
        setDownvoteCast(props.downvotes + 1);
        setUpvoteCast(props.upvotes);
        setArrowImgUp('Up');
        setArrowImgDown('DownActive');
      }
    };

    if (category === '' && arrowImgUp === 'Up' && arrowImgDown === 'DownActive') {
      if (vote === 'up') {
        setUpvoteCast(props.upvotes + 1);
        setDownvoteCast(props.downvotes);
        setArrowImgUp('UpActive');
        setArrowImgDown('Down');
      } else if (vote === null) {
        setDownvoteCast(props.downvotes);
        setUpvoteCast(props.upvotes);
        setArrowImgUp('Up');
        setArrowImgDown('Down');
      }
    };

  };
  //format votes

  let displayUpVote = upVoteCast;
  if (displayUpVote > 9) {
    displayUpVote = displayUpVote
  } else {
    displayUpVote = '0' + displayUpVote
  }

  let displayDownVote = downVoteCast;
  if (displayDownVote > 9) {
    displayDownVote = displayDownVote
  } else {
    displayDownVote = '0' + displayDownVote
  }


  //UpVote
  const addVote = () => {
    // console.log("It works, Whoopieee");

    let payloadData = {
      vote: 'upvote',
      userId: sessionStorage.getItem('id'),
      questionId: props.questionId
    }

    axios.post('http://localhost:5000/api/addvote', payloadData)
      .then((res) => {
        if (res) {
          // console.log("Vote Added"); 
          console.log(payloadData);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  //======================================================================
  //downvote



  const subtractVote = () => {
    // console.log("It works, Whoopieee");

    let payloadData = {
      vote: 'downvote',
      userId: sessionStorage.getItem('id'),
      questionId: props.questionId
    }
    // console.log(payloadData);

    axios.post('http://localhost:5000/api/addvote', payloadData)
      .then((res) => {
        if (res) {
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

  let desc = (props.description).substring(0, 80);



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
          if(data === null){
            setUsername('Deleted User');
          }else{
            setUsername(data.username);
            setRank(data.rank);
            setprofileImg(data.profileimage);
            setYear(data.yearlevel);
          }
 
          // console.log(data.rank)
        })
    }
    // localStorage.clear();
  }, []);

  //get profile image path
  const imgURL = ('Avatars/' + profileImg + '.png');

  // console.log(year);
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


//Style Button
const buttonStyle = {
  backgroundColor: '#FF7900',
  borderRadius: '50px',
  height: '48px',
  marginTop: '16px',
  width: 'auto',
  padding: '16px 24px',
  fontFamily: 'Open Sans',
  textTransform: 'capitalize',
  '&:hover': {
      background: 'FF7900',
      color: '#2B2B2B'
  }
}


  return (

    <div className="IndividualQCard">
      {flagModal}
      <div className="qq_and_title">
        <div className="title_show">
          <h1 className="questionTitle">{props.title}</h1>
          <p className="questionInfo">
            Posted by: <label id="Username">{username}</label> <br></br>{" "}
            <label id="Date">{date}</label>
          </p>
        </div>

        <div className="tags">
          {props.tags.map((item) => {
            return (
              <div className="tags_block">
                <p>{item}</p>
              </div>
            );
          })}
        </div>

      </div>

      <div className="question">
        <p>{props.description}</p>
      </div>

      <div className="slideshow">
        <div className="slideshow-slider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
          {screenshots.map((screenshot, index) => (
            <div className="slide" key={index}>
              <img src={screenshot} className="slide-img" />
            </div>
          ))}
        </div>

        <div className="slideshow-dots">
          {screenshots.map((_, idx) => (
            <div key={idx} className={`slideshow-dot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}>
            </div>
          ))}
        </div>
      </div>

      <div className="code_text">
        {/* Code Converted Text Here */}
        <Highlight autodetect className="code-converted-text">
          {props.code}
        </Highlight>
      </div>

      <div className='divider'></div>

      <div className="answer_question_btn">
        <div className='bottom-block'>
          <div className='arrow-con'>
            <ToggleButtonGroup
              value={voteCast}
              onChange={handleVote}
              color="primary"
              exclusive
              sx={{ display: 'flex', alignItems: 'center' }}>
              <ToggleButton onClick={addVote} value="up">
                <img className='upvote question-card-icon' src={upImgURL} />
              </ToggleButton>

              <small className='upvote-count vote-count'>{displayUpVote}</small>

              <ToggleButton onClick={subtractVote} value="down">
                <img className='downvote question-card-icon' src={downImgURL} />
              </ToggleButton>

              <small className='downvote-count vote-count'>{displayDownVote}</small>
            </ToggleButtonGroup>
          </div>

          {/* FLAG COLOR HERE in div class: flag-button-red */}
          {flagState ? (
            <div className='flag-button-red question-card-icon' onClick={() => console.log("Already flagged")}>
              <OutlinedFlagIcon fontSize="large" />
            </div>
          ) : (
            <div className='flag-button question-card-icon' onClick={() => flagQuestion()}>
              <OutlinedFlagIcon fontSize="large" />
            </div>
          )}
        <Button   onClick={() => AnswerQuestion()} variant='contained' disableElevation style={buttonStyle}>Answer Question</Button>
        </div>
      </div>
    </div>
  );
};
