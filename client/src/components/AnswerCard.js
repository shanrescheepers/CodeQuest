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
import flagQuestion from "../assets/individualPageAssets/questionFlag.png";
import questionImage from "../assets/individualPageAssets/QuestionImg.png";

export const AnswerCard = (props) => {
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
  console.log(
    "over here" +
      ".../server/answerScreenshots/" +
      props.screenshots[0].filename
  );
  const s = "...server/" + props.screenshots[0].filename;
  return (
    <div className="show_answered_con">
      <div className="show_answered_blue_con">
        <div className="show_answer_text">
          
          <h4>Posted by {username}</h4>
         <p>{formatDate}</p>
        </div>
        <div className="show_answer_text">
          <p>{props.description}</p>
        </div>
        <div className="show_answer_text">
          <img
            className="q_img"
            src={"...server/" + props.screenshots[0].filename}
          ></img>
        </div>
        <div className="code_text">{props.code}</div>
        <div className="answer_question_btn">
          <div className="icons_block">
            <img src={UpVote} className="UpVote"></img>
            <p className="UpVote_text">00</p>
            <img src={DownVote} className="DownVote"></img>
            <p className="DownVote_text">00</p>
            <img src={flagQuestion} className="flagQuestion"></img>
          </div>
          <button
            onClick={() => AnswerQuestion()}
            className="btn_answer_question"
          >
            Respond
          </button>
        </div>
      </div>
    </div>
  );
};

