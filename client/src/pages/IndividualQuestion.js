import React from "react";
import Navigation from "../components/Navigation";
import "../css/IndividualQuestion.css";
import "../css/profilePage.css";
import $ from "jquery";
import questionImage from "../assets/individualPageAssets/QuestionImg.png";
import UpVote from "../assets/profilePageAssets/upVote.png";
import DownVote from "../assets/profilePageAssets/downVote.png";
import returnIcon from "../assets/individualPageAssets/returnIcon.png";
import flagQuestion from "../assets/individualPageAssets/questionFlag.png";
import infoIcon from "../assets/individualPageAssets/infoIcon.png";
import { Label } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { ArrowBackRounded } from "@mui/icons-material";
import Helmet from "react-helmet";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import upload from "../assets/newQuestionAssets/upload.png";
import QuestionAdded from "../modals/QuestionAdded";

const IndividualQuestion = () => {
  
  function AnswerQuestion() {
    console.log("something");
    $(".answer_question").fadeIn();
  }
  const HideAnswer = () => {
    console.log("something");
    $(".answer_question").fadeOut();
  };

  /*  copied code*/
  const buttonStyle = {
    backgroundColor: "#FF7900",
    borderRadius: "50px",
    marginTop: "16px",
    width: "100%",
    padding: "16px 24px",
    fontFamily: "Open Sans",
    textTransform: "capitalize",
    "&:hover": {
      background: "FF7900",
      color: "#2B2B2B",
    },
  };

  const navigate = useNavigate();

  const goBack = () => {
    sessionStorage.removeItem("questionId");
    navigate(-1);
  };

  //set initial form values
  let initialFormValues = ["title", "description", "code", "tags"];

  //set form values from input fields
  const [formValues, setFormValues] = useState(initialFormValues);

  //get values input files
  const getFormValues = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //screenshot names
  const [screenshots, setScreenshots] = useState([]);
  const [screenshotFiles, setImageFiles] = useState([]);
  const [uploadedScreenshots, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

  //get screenshots + display them in the image slider
  const getScreenshots = (e) => {
    // // hide screenshots upload thingie
    document.getElementById("upload-image-con").style.display = "none";
    document.getElementById("screenshot-preview").style.backgroundColor =
      "#F1F1FC";

    let screenshotFiles = e.target.files;
    setScreenshots(screenshotFiles);

    const { files } = e.target;
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    }
    alert("Selected uploadedScreenshots are not of valid type!");
  };

  const [postConfirmation, setPostConfirmation] = useState();

  useEffect(() => {
    const uploadedScreenshots = [],
      fileReaders = [];
    let isCancel = false;
    if (screenshotFiles.length) {
      screenshotFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            uploadedScreenshots.push(result);
          }
          if (
            uploadedScreenshots.length === screenshotFiles.length &&
            !isCancel
          ) {
            setImages(uploadedScreenshots);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [screenshotFiles]);

  //add new question to database
  const addNewQuestion = (e) => {
    e.preventDefault();

    //turn every character to a lowercase charater
    const lowercaseTags = formValues.tags.toLowerCase();
    //split tags string by comma or space
    let seperateLowercaseTags = lowercaseTags.split(/[ ,]+/);

    //make a tags array
    let tagsArray = [];

    //capatalise the first letter of every word then put it into an array
    for (let i = 0; i < seperateLowercaseTags.length; i++) {
      const firstLetter = seperateLowercaseTags[i].charAt(0);
      const firstLetterCap = firstLetter.toUpperCase();
      const remainingLetters = seperateLowercaseTags[i].slice(1);
      const capitalisedWord = firstLetterCap + remainingLetters;

      const tags = capitalisedWord;
      tagsArray.push(tags);
    }

    const payloadData = new FormData();

    var UserID = sessionStorage.getItem("id");
    var questionId = sessionStorage.getItem("id");
    var Upvotes = 0;
    var Downvotes = 0;

    let payload = {
      userId: UserID,
      uestionId: questionId,
      description: formValues["description"],
      code: formValues["code"],

      upvotes: +Upvotes,
      downvotes: +Downvotes,
      datePosted: "2002/05/22",
    };

    //appends text
    payloadData.append("information", JSON.stringify(payload));

    //appends uploadedScreenshots
    for (let i = 0; i < screenshots.length; i++) {
      const element = screenshots[i];
      payloadData.append("screenshots", element);
    }

    // send payload to database
    Axios.post("http://localhost:5000/api/addanswer", payloadData)
      .then((res) => {
        if (res) {
          //show post confirmation modal
          setPostConfirmation(<QuestionAdded close={setPostConfirmation} />);
          console.log("New Question Added. Slayyy!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Question Expand</title>
      </Helmet>

      <div className="pp_main_card">
        <ArrowBackRounded
          sx={{ fontSize: "40px", color: "#2b2b2b" }}
          className="backArrow"
          onClick={goBack}
        />
        <div className="display_question">
          <div className="qq_and_title">
            <div className="title_show">
              <p className="questionTitle">Question Title</p>
              <p className="questionInfo">
                Posted by: <label id="Username">Username</label> <br></br>{" "}
                <label id="Date">00 September 2022</label>
              </p>
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
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. hello world
            </p>
          </div>

          <div className="question_image">
            <img className="q_img" src={questionImage}></img>
          </div>

          <div className="code_text">
            <p>
              {" "}
              Grid item xs=12 md=12 lg=12 order= xs: 1, md: 1 Item
              elevation=false{" "}
            </p>
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
        {/* */}{" "}
        <div className="answer_question">
          <form className="form-con">
            <h1>Ask us Anything</h1>
            <p>
              Strictly related to dev though, questions deemed inappropriate
              will be removed
            </p>

            <TextField
              name="title"
              placeholder="Title"
              color="grey"
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: "50px",
                marginTop: "16px",
              }}
              onChange={getFormValues}
            />
            <TextField
              name="description"
              placeholder="Description"
              multiline
              color="grey"
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: "50px",
                marginTop: "16px",
              }}
              onChange={getFormValues}
            />

            <div className="screenshot-preview" id="screenshot-preview">
              <div className="upload-image-con" id="upload-image-con">
                <div className="things">
                  <img
                    className="img-picture"
                    src={upload}
                    alt="image placeholder"
                  />
                  <p>Click here to add your screenshots.</p>
                </div>

                <input
                  name="screenshots"
                  className="image-input"
                  id="image-input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={getScreenshots}
                />
              </div>

              <div className="slideshow">
                <div
                  className="slideshow-slider"
                  style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
                >
                  {uploadedScreenshots.map((screenshot, index) => (
                    <div className="slide" key={index}>
                      <img src={screenshot} className="slide-img" />
                    </div>
                  ))}
                </div>

                <div className="slideshow-dots">
                  {uploadedScreenshots.map((_, idx) => (
                    <div
                      key={idx}
                      className={`slideshow-dot${
                        index === idx ? " active" : ""
                      }`}
                      onClick={() => {
                        setIndex(idx);
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <TextField
              name="code"
              placeholder="Code"
              color="grey"
              multiline
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: "50px",
                marginTop: "16px",
              }}
              onChange={getFormValues}
            />
            <TextField
              name="tags"
              placeholder="Tags"
              color="grey"
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: "50px",
                marginTop: "16px",
              }}
              onChange={getFormValues}
            />

            <Button
              type="submit"
              onClick={addNewQuestion}
              variant="contained"
              disableElevation
              style={buttonStyle}
            >
              Answer Question
            </Button>

            <div className="answer-btn">
              <p onClick={() => HideAnswer()}>Cancel</p>
            </div>
          </form>

          {/*=================*/}
        </div>
        <div className="show_answered_con">
          <div className="show_answered_blue_con">
            <div className="show_answer_text">
              <p>Title</p>
            </div>
            <div className="show_answer_text">
              <p>
                Strictly related to dev though, questions deemed inappropriate
                will be removed Strictly related to dev though, questions deemed
                inappropriate will be removed Strictly related to dev though,
                questions deemed inappropriate will be removed Strictly related
                to dev though, questions deemed inappropriate will be removed
              </p>
            </div>
            <div className="show_answer_text">
              <img className="q_img" src={questionImage}></img>
            </div>
            <div className="code_text"></div>
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
      </div>
    </div>
  );
};

export default IndividualQuestion;
