import "../css/NewQuestion.css";
import "../css/ResultPage.css";
import { Button } from "@mui/material";
import headerImg from "../assets/homeAssets/header-img.png";
import QuestionCard from "../components/QuestionCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Helmet from "react-helmet";
import axios from "axios";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import { ArrowBackRounded } from "@mui/icons-material";
const ResultPage = (props) => {
  //Should rather be using Props

  let searchText = sessionStorage.getItem("SearchText");

  // Why session storage???

  const buttonStyle = {
    backgroundColor: "#FF7900",
    borderRadius: "50px",
    height: "42px",
    marginTop: "16px",
    width: "auto",
    padding: "16px 24px",
    fontFamily: "Open Sans",
    textTransform: "capitalize",
    "&:hover": {
      background: "FF7900",
      color: "#2B2B2B",
    },
  };

  const secondaryButtonStyle = {
    backgroundColor: "#2B2B2B",
    borderRadius: "50px",
    height: "45px",
    width: "auto",
    padding: "16px 24px",
    fontFamily: "Open Sans",
    textTransform: "capitalize",
    "&:hover": {
      background: "FF7900",
      color: "#2B2B2B",
    },
  };
  const navigate = useNavigate();

  const askNewQuestion = () => {
    navigate("/newquestion");
  };

  const goBack = () => {
    sessionStorage.removeItem("questionId");
    navigate(-1);
  };
  const [questions, setQuestions] = useState();
  const [updateQuestions, setUpdateQuestions] = useState();

  let getSearchText = sessionStorage.getItem("SearchText");

  useEffect(() => {
    //This get function should take the prop value
    //This should give back an array of questions
    //If it was backend driven then it would be easy to implement extra search parameters like tags. Title. Description...
    axios
      .get("http://localhost:5000/api/search/" + getSearchText.toLowerCase())
      .then((res) => {
        let questionData = res.data;
        //Why is this process being done on the frontend
        //This should be back-end driven
        //Should be driven from an endpoint
        // let filteredSearch = questionData.filter(
        //   (items) => items.title.toLowerCase() == getSearchText.toLowerCase()
        // );
        let renderQuestions = questionData.map((item) => (
          <QuestionCard
            key={item._id}
            questionId={item._id}
            date={item.datePosted}
            title={item.title}
            description={item.description}
            upvotes={item.upvotes}
            downvotes={item.downvotes}
            userId={item.userId}
            editRender={setUpdateQuestions}
          />
        ));
        setQuestions(renderQuestions);
        setUpdateQuestions(false);
      })
      .catch((err) => console.log(err));
  }, [updateQuestions]);

  return (
    <>
      {" "}
      <motion.div
        className="home-con"
        intital={{ width: 0 }}
        animate={{ width: "76%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
      >
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div>
          <ArrowBackRounded
            sx={{ fontSize: "40px", color: "#2b2b2b" }}
            className="backArrow-search"
            onClick={goBack}
          />
        </div>
        <br></br>
        <br></br>

        <div className="title-con-search">
          <h2>Search Result For "{searchText}"</h2>
        </div>

        <div className="question-card-con">{questions}</div>
      </motion.div>
    </>
  );
};
export default ResultPage;
