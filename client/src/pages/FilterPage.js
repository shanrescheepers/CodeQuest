import React from "react";

import "../css/NewQuestion.css";
import "../css/ResultPage.css";
import { Button } from "@mui/material";
import headerImg from "../assets/homeAssets/header-img.png";
import QuestionCard from "../components/QuestionCard";
import { motion } from "framer-motion";

import Helmet from "react-helmet";
import axios from "axios";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import { ArrowBackRounded } from "@mui/icons-material";
import { color } from "@mui/system";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const ResultPage = (props) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);

    sessionStorage.setItem("filter", event.target.value);
    navigate("/FilterPage");
    window.location.reload(false);
    console.log(event.target.value);
  };
  let searchText = sessionStorage.getItem("SearchText");
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

  let getFilterText = sessionStorage.getItem("filter");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/readquestions")
      .then((res) => {
        let questionData = res.data;
        let idArray = [];
        let tagsArray = questionData.map((item) => {
          item.tags.map((tag) => {
            if (tag.toLowerCase() == getFilterText.toLowerCase()) {
              idArray.push(item._id);
            }

            return tag;
          });
        });

        console.log(idArray);

        for (let x = 0; x < questionData.length; x++) {
          console.log();

          for (let y = 0; y < idArray.length; y++) {
            if (questionData[x]._id == idArray[y]) {
            }
          }
        }
        let renderQuestions = questionData.map((item) => {
          for (let y = 0; y < idArray.length; y++) {
            if (item._id == idArray[y]) {
              return (
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
              );
            }
          }
        });
        setQuestions(renderQuestions);
        setUpdateQuestions(false);
      })
      .catch((err) => console.log(err));
  }, [updateQuestions]);

  return (
    <div>
      <Helmet>
        <title>Questions</title>
      </Helmet>
      {/* <Navigation/> */}
      <div className="pp_main_card">
        <div className="pp_welcome_con">
          <div className="pp_welcome_banner1">
            <h1>Questions</h1>
            <p>
              Sharing is caring - especially when it comes to knowledge. So
              please don’t hesitate to ask or answer!
            </p>
            <NavLink to="/newquestion">
              <Button
                sx={{
                  backgroundColor: "#FF7900",
                  borderRadius: "20px",
                  height: "43px",
                  textTransform: "capitalize",
                  marginTop: "20px",
                  width: "140px",
                  fontFamily: "Open Sans",
                  "&:hover": {
                    backgroundColor: "#FF7900",
                  },
                }}
                variant="contained"
              >
                Ask Question
              </Button>
            </NavLink>
          </div>
          <div className="pp_welcome_banner-img"></div>
        </div>
        <div className="dropdown_con">
          <div className="dropdowns">
            <Box sx={{ minWidth: 200, width: "140px", margin: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                  sx={{
                    background: "white",
                    "border-color": "white",
                    "border-radius": "40px",
                  }}
                >
                  <MenuItem value={"Java"}>1st Year</MenuItem>
                  <MenuItem value={"Node"}>2nd Year</MenuItem>
                  <MenuItem value={"Express"}>3rd Year</MenuItem>
                  <MenuItem value={"React"}>4rd Year</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 200, width: "140px", margin: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tags</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                  sx={{
                    background: "white",
                    "border-color": "white",
                    "border-radius": "40px",
                  }}
                >
                  <MenuItem value={"Java"}>Java</MenuItem>
                  <MenuItem value={"Node"}>Node</MenuItem>
                  <MenuItem value={"Express"}>Express</MenuItem>
                  <MenuItem value={"React"}>React</MenuItem>
                </Select>
              </FormControl>
            </Box>{" "}
          </div>
          <div>
            <Button
              sx={{
                backgroundColor: "#2b2b2b",
                borderRadius: "20px",
                marginTop: "20px",
                width: "150 px",
                textTransform: "capitalize",
                height: "45px",
                fontFamily: "Open Sans",
                "text-transform": "none",
                "&:hover": {
                  backgroundColor: "#FF7900",
                },
              }}
              variant="contained"
            >
              Ask a question
            </Button>
          </div>
        </div>
        <div className="question-card-con">{questions}</div>
      </div>
    </div>
  );
};
export default ResultPage;
