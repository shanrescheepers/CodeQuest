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
import QuestionCard from "../components/QuestionCard";
import { AnswerCard } from "../components/AnswerCard";
import { IndividualQuestionCard } from "../components/IndividualQuestionCard";
import moment from "moment";


const IndividualQuestion = () => {
  const [questions, setQuestions] = useState();
  const [updateQuestions, setUpdateQuestions] = useState();

  useEffect(() => {
    Axios.get("http://localhost:5000/api/readquestions")
      .then((res) => {
        let questionData = res.data;
        let renderQuestions = questionData.map((item) => {
          //   console.log(item);

          if (item._id == sessionStorage.getItem("questionId")) {

            let date = questionData.date;
            let formatted = moment(date).format('DD MMMM YYYY');
            return (
              <IndividualQuestionCard
                key={item._id}
                questionId={item._id}
                date={formatted}
                title={item.title}
                description={item.description}
                screenshots={item.screenshots}
                code={item.code}
                tags={item.tags}
                upvotes={item.upvotes}
                downvotes={item.downvotes}
                userId={item.userId}
                editRender={setUpdateQuestions}
              />
            );
          }
        });

        setQuestions(renderQuestions);
        setUpdateQuestions(false);
      })
      .catch((err) => console.log(err));
  }, [updateQuestions]);

  /*====================== */

  const [answer, setAnswer] = useState();
  const [updateAnswers, setUpdateAnswers] = useState();

  useEffect(() => {
    Axios.get("http://localhost:5000/api/readQuestionAnswer/" + sessionStorage.getItem("questionId"))
      .then((res) => {
        let filterAnswer = [];
        let questionData = res.data;

        questionData.map((item) => {
          if (item.questionId == sessionStorage.getItem("questionId")) {
            filterAnswer.push(item);
          }
        });
         filterAnswer.sort((a, b) => {
          return b.upvotes - a.upvotes;

        }); 
        
        console.log(filterAnswer);
        let renderAnswers = filterAnswer.map((item) => {
            return (
              <AnswerCard
                key={item._id}
                answerId={item._id}
                questionId={item._id}
                date={item.datePosted}
                code={item.code}
                screenshots={item.screenshots}
                description={item.description}
                upvotes={item.upvotes}
                downvotes={item.downvotes}
                userId={item.userId}
                editRender={setUpdateAnswers}
              />
            );
          


        });
        setAnswer(renderAnswers);
        setUpdateAnswers(false);
      })
      .catch((err) => console.log(err));
  }, [updateAnswers]);

  /*====================== */
  function AnswerQuestion() {
    // console.log("something");
    $(".answer_question").fadeIn();
  }
  const HideAnswer = () => {
    // console.log("something");
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

    const payloadData = new FormData();

    var UserID = sessionStorage.getItem("id");
    var questionId = sessionStorage.getItem("questionId");
    var Upvotes = 0;
    var Downvotes = 0;

    let payload = {
      userId: UserID,
      questionId: questionId,
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
          //   console.log("New answer Added. Slayyy!");
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  return (
    <div>
      {postConfirmation}
      <Helmet>
        <title>Question Expand</title>
      </Helmet>

      <div className="pp_main_card question">
        <ArrowBackRounded
          sx={{ fontSize: "40px", color: "#2b2b2b", cursor: 'pointer' }}
          className="backArrow"
          onClick={goBack}
        />
        <div className="display_question">
          <div className="">{questions}</div>
        </div>
        {/* */}


        <div className="answer_question">
          <form className="form-con">
            <h2>Your Answer</h2>

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
                      className={`slideshow-dot${index === idx ? " active" : ""
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


            <Button
              type="submit"
              onClick={addNewQuestion}
              variant="contained"
              disableElevation
              style={buttonStyle}
            >
              Answer Question
            </Button>

            <div onClick={() => HideAnswer()} className="answer-btn" style={{border:'none'}}>
              <p>Cancel</p>
            </div>
          </form>

          {/*=================*/}
        </div>

        <h1>Answers</h1>

        <div className="">{answer}</div>
      </div>
    </div>
  );
};

export default IndividualQuestion;
