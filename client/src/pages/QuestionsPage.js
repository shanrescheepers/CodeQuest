import React from "react";
import Button from "@mui/material/Button";
import QuestionCard from "../components/QuestionCard";
import AnswerCard from "../components/AnswerCard";
import Helmet from "react-helmet";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// System gets cleared, and useeffect is forced to update when a tag is selected : Shanre (busy redoing this entire thing)
const QuestionsPage = () => {
  const navigate = useNavigate();

  const askNewQuestion = () => {
    navigate('/newquestion')
  }
  //Please use better descriptions. Age? Age for What? DateOrder makes much more sense.
  const [dateOrder, setdateOrder] = React.useState("");
  const [tag, setTag] = React.useState("");

  const tagHandleChange = (e) => {
    setTag(e.target.value);
    e.preventDefault()


    // THISIS SO FAR FROM RIGHT  this is not what we've learnt, this is firstyear dev work.
    // sessionStorage.setItem("filter", event.target.value);
    // navigate("/FilterPage"); --> this just destroys the usestate???????
    // window.location.reload(false);

    // console.log(event.target.value);

    setUpdateQuestions(true)
    setQuestions()

  };

  const handleChange = (e) => {
    setdateOrder(e.target.value);
    // page kept on reloading, how was this not seen and fixed before Thato?
    e.preventDefault()

    // sessionStorage.setItem("filter", event.target.value);
    // navigate("/FilterPage");
    // window.location.reload(false);

    // console.log(event.target.value);

    setUpdateQuestions(true)
    setQuestions()
  };

  //========================================================================================
  //Display All Questions
  //read products
  const [questions, setQuestions] = useState();
  const [updateQuestions, setUpdateQuestions] = useState();

  // functions to sort by date
  function sortNewest(a, b) {
    var dateA = new Date(a.datePosted).getTime();
    var dateB = new Date(b.datePosted).getTime();
    return dateA < dateB ? 1 : -1;
  }
  function sortOldest(a, b) {
    var dateA = new Date(a.datePosted).getTime();
    var dateB = new Date(b.datePosted).getTime();
    return dateA > dateB ? 1 : -1;
  }

  useEffect(() => {

    if (tag == "" && dateOrder == "") {
      axios
        .get("http://localhost:5000/api/readquestions")
        .then((res) => {
          let questionData = res.data;
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
    } else if (tag != "") {
      console.log(tag)
      axios
        .get("http://localhost:5000/api/questiontag/" + tag)
        .then((res) => {
          let questionData = res.data;
          console.log(questionData)

          if (dateOrder == "Oldest") {
            questionData = questionData.sort(sortOldest);
          } else if (dateOrder == "Newest") {
            questionData = questionData.sort(sortNewest);
          }

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

      console.log("Filter by tag")

    }

    if (dateOrder != "" && tag == "") {
      axios
        .get("http://localhost:5000/api/readquestions")
        .then((res) => {
          let questionData = res.data;

          if (dateOrder == "Oldest") {
            questionData = questionData.sort(sortOldest);
          } else {
            questionData = questionData.sort(sortNewest);
          }

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

          setUpdateQuestions(false);

          setQuestions(renderQuestions);

        })
        .catch((err) => console.log(err));




    }



  }, [updateQuestions]);

  //verify User
useEffect(()=>{

  let verifyUser = {token: sessionStorage.getItem('token')};
  if(!verifyUser.token){
    navigate('/');
    sessionStorage.clear();
  }else{
    axios.post('http://localhost:5000/api/verifytoken', verifyUser)
    .then(res =>{
      console.log(res.data);
      if(res.data.verified === false){
        navigate('/');
        sessionStorage.clear();

      }
    })
  }

}, []);

  return (
    <div>
      <Helmet>
        <title>Questions</title>
      </Helmet>
      {/* <Navigation/> */}
      <motion.div className="pp_main_card"
        initial={{ width: 0 }}
        animate={{ width: "76.8%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
      >
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
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Posts</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dateOrder}
                  label="dateOrder"
                  onChange={handleChange}
                  sx={{
                    background: "white",
                    "border-color": "white",
                    "border-radius": "40px",
                  }}
                >
                  <MenuItem value={"Oldest"}>Oldest</MenuItem>
                  <MenuItem value={"Newest"}>Newest</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 200, width: "140px", margin: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tags</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tag}
                  label="Tag"
                  onChange={tagHandleChange}
                  sx={{
                    background: "white",
                    "border-color": "white",
                    "border-radius": "40px",
                  }}
                >
                  <MenuItem value={"Javascript"}>Javascript</MenuItem>
                  <MenuItem value={"Node"}>Node</MenuItem>
                  <MenuItem value={"Express"}>Express</MenuItem>
                  <MenuItem value={"React"}>React</MenuItem>
                  <MenuItem value={"Python"}>Python</MenuItem>
                  <MenuItem value={"C++"}>C++</MenuItem>
                  <MenuItem value={"Swift"}>Swift</MenuItem>
                  <MenuItem value={"Kotlin"}>Kotlin</MenuItem>
                  <MenuItem value={"Chartjs"}>Chartjs</MenuItem>
                  <MenuItem value={"Angular"}>Angular</MenuItem>
                  <MenuItem value={"Bootstrap"}>Bootstrap</MenuItem>
                  <MenuItem value={"MUI"}>MUI</MenuItem>
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
              onClick={askNewQuestion}
            >
              Ask a question
            </Button>
          </div>
        </div>
        <div className="question-card-con">{questions}</div>
      </motion.div>
    </div>
  );
};

export default QuestionsPage;
