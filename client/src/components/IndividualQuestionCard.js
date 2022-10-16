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

export const IndividualQuestionCard = (props) => {
  function AnswerQuestion() {
    console.log("something");
    $(".answer_question").fadeIn();
  }

  const navigate = useNavigate();
  function AnswerQuestion() {
    console.log("something");
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

  useEffect(() => {
    if (props.userId == null) {
      console.log("User not logged in");
    } else {
      console.log("user logged in");
      axios
        .get("http://localhost:5000/api/userInfo/" + props.userId)
        .then((res) => {
          let data = res.data;
          setUsername(data.username);
          setRank(data.rank);
          setprofileImg(data.profileimage);
          setYear(data.yearlevel);
          console.log(data.rank);
        });
    }
    // localStorage.clear();
  }, []);

  //get profile image path
  const imgURL = "Avatars/" + profileImg + ".png";

  console.log(year);
  let bgColor = "";

  if (year === 1) {
    bgColor = "#6EEB83";
  } else if (year === 2) {
    bgColor = "#6CD4FF";
  } else {
    bgColor = "#FF7900";
  }

  return (
    <div>
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

      {/* <div className="question_image">
        <img className="q_img" src={props.screenshots[0]}></img>
      </div> */}

      <div className="image-preview"></div>

      <div className="code_text">
        <p>{props.code}</p>
      </div>

      <div className='divider'></div>

      <div className="answer_question_btn">
        <div className='bottom-block'>
            <div className='arrow-con'>                         
                <img className='upvote question-card-icon' onClick={UpVote} src={UpVote}/>
                <small className='upvote-count vote-count'>{upVotes}</small>

                <img className='downvote question-card-icon' onClick={subtractVote} src={DownVote}/>
                <small className='downvote-count vote-count'>{downVotes}</small>

                <img className='flag question-card-icon' src={flagQuestion}/>
            </div>

            <button
                onClick={() => AnswerQuestion()}
                className="btn_answer_question">
                Answer Question
            </button>
        </div>
      </div>
    </div>
  );
};
