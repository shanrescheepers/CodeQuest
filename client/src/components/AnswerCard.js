import "../css/QuestionCard.css";
import "../css/profilePage.css";
import "../css/IndividualQuestion.css";
import profilePic from "../assets/homeAssets/profile-pic.png";
import { Link } from "react-router-dom";
import UpVote from "../assets/questionCardAssets/upvote.png";
import DownVote from "../assets/questionCardAssets/downvote.png";
import deleteIcon from "../assets/questionCardAssets/delete.png";
import $ from "jquery";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router";
import questionImage from "../assets/individualPageAssets/QuestionImg.png";
import upvote from "../assets/profilePageAssets/upVote.png";
import downvote from "../assets/profilePageAssets/downVote.png";
import flag from "../assets/individualPageAssets/questionFlag.png";

export const AnswerCard = (props) => {
    const [index, setIndex] = useState(0);
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

  const deleteQuestion = () => {
    //delete question functionality
  };

  const addVote = () => {
    //add vote functionality
  };

  const subtractVote = () => {
    //subtract vote functionality
  };
  //===================================================================
  //Format Date date
  let date = props.date;
  let formatDate = moment(date).format("DD MMMM YYYY");

  //====================================================================
  //Cut descirption

  let desc = props.description.substring(0, 80);

  //====================================================================
  //Format votes

  let upVotes = props.upvotes;
  if (upVotes > 9) {
    upVotes = props.upvotes;
  } else {
    upVotes = "0" + upVotes;
  }

  let downVotes = props.downvotes;
  if (upVotes > 9) {
    downVotes = props.downvotes;
  } else {
    downVotes = "0" + downVotes;
  }
  //=====================================================================
  //User Info

  const [username, setUsername] = useState();
  const [rank, setRank] = useState();
  const [profileImg, setprofileImg] = useState();
  const [year, setYear] = useState();
  const [questionColor, setQuestionColor] = useState();
  const [answerConfirmation, setAnsweronfirmation] = useState();

    //display screenshots in image slider 
    let aScreenshots = props.screenshots;

    let screenshots = [];  

    for (let i = 0; i < aScreenshots.length; i++){
        let URLs = 'http://localhost:5000/answerScreenshots/' + aScreenshots[i].filename;
        screenshots.push(URLs);
    }   


  useEffect(() => {
    if (props.userId == null) {
    //   console.log("User not logged in");
    } else {
    //   console.log("user logged in");
      axios
        .get("http://localhost:5000/api/userInfo/" + props.userId)
        .then((res) => {
          let data = res.data;
          setUsername(data.username);
          setRank(data.rank);
          setprofileImg(data.profileimage);
          setYear(data.yearlevel);
        //   console.log(data.rank);

          let year = data.yearlevel;
          let bgColor = '';

          if (year === 1) {
            bgColor = "#6EEB83";
          } else if (year === 2) {
            bgColor = "#6CD4FF";
          } else {
            bgColor = "#FF7900";
          }

          setQuestionColor(bgColor)   	    
        });
    }
  }, []);

//   console.log(questionColor);

  //get profile image path
  const imgURL = "Avatars/" + profileImg + ".png";
//   console.log(year);
  
//   console.log(
//     "over here" +
//       ".../server/answerScreenshots/" +
//       props.screenshots[0].filename
//   );
  const s = "http://localhost:5000/answerScreenshots/" + props.screenshots[0].filename;

  return (
    <div className="show_answered_con" style={{backgroundColor:questionColor}}>
      <div className="show_answered_blue_con">

        <div className="show_answer_text">
            <h4>Posted by {username}</h4>
            <p>{formatDate}</p>
        </div>

        <div className="show_answer_text">
          <p>{props.description}</p>
        </div>

        <div className="slideshow">
            <div className="slideshow-slider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {screenshots.map((screenshot, index) => (
                    <div className="slide" key={index}>
                        <img src={screenshot} className="slide-img"/>
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
            <p>{props.code}</p>
        </div>

        <div className='divider'></div>

        <div className='bottom-block'>
            <div className='arrow-con'>                         
                <img className='upvote question-card-icon' onClick={addVote} src={upvote}/>
                <small className='upvote-count vote-count'>{upVotes}</small>

                <img className='downvote question-card-icon' onClick={subtractVote} src={downvote}/>
                <small className='downvote-count vote-count'>{downVotes}</small>

                <img className='flag question-card-icon' onClick={addVote} src={flag}/>
            </div>

            <small><p>00 Answers</p></small>
        </div>

      </div>
    </div>
  );
};

