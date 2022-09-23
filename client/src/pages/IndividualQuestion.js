import React from 'react';
import Navigation from "../components/Navigation";
import "../css/IndividualQuestion.css";
import "../css/profilePage.css";
import $ from "jquery";
import questionImage from "../assets/individualPageAssets/QuestionImg.png";
import UpVote from "../assets/profilePageAssets/upVote.png";
import DownVote from "../assets/profilePageAssets/downVote.png";
import returnIcon from "../assets/individualPageAssets/returnIcon.png"
import flagQuestion from "../assets/individualPageAssets/questionFlag.png"
import infoIcon from "../assets/individualPageAssets/infoIcon.png"
import { Label } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';


const IndividualQuestion = () => {
    function AnswerQuestion() {
        console.log("something");
        $(".answer_question").fadeIn();
      }
      const HideAnswer = () => {
        console.log("something");
        $(".answer_question").fadeOut();
      };

    return (
        <div>
            <div className="pp_main_card">
            <NavLink activeclassname="active" to="/FeedPage"><img className='returnIcon' src={returnIcon}/></NavLink>

        <div className="display_question">
          <div className="qq_and_title">
            <div className="title_show">
              <p className='questionTitle'>Question Title</p>
              <p  className='questionInfo'>Posted by: <label id='Username'>Username</label> <br></br> <label id='Date'>00 September 2022</label></p>
            </div>
            <div className="tags">
              <div className="tags_block">
                <p>Null</p>
              </div>
              <div className="tags_block">
                <p>React</p>
              </div>
            </div>
          </div>
          <div className="question">
            <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
            </p>
          </div>

          <div className="question_image">
            <img className="q_img" src={questionImage}></img>
          </div>

          <div className="code_text">
            <p> Grid item xs=12 md=12 lg=12 order= xs: 1, md: 1
        Item elevation=false </p>
          </div>

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
              {" "}
              Answer Question
            </button>
          </div>
        </div>

        {/* */}
        <div className="answer_question">
          <div className="title_show_answer">
            <p className='questionAns' >Your Answer</p>
            <img src={infoIcon} className="infoIcon"></img>
          </div>
          <div className="answer_description">
            <input placeholder="Description" type="text"></input>
          </div>
          <div className="save_image">
            <p>Image</p>
          </div>

          <div className="answer_description">
            <input placeholder="Tags" type="text"></input>
          </div>

          <div className="answer-btn">
            <button className="btn_answered">Answer Question</button>
            <p onClick={() => HideAnswer() }>Cancel</p>
          </div>
        </div>
      </div>
    </div>

        
    
    );
};

export default IndividualQuestion;