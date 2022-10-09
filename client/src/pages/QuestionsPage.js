import React from "react";
import Button from "@mui/material/Button";
import QuestionCard from '../components/QuestionCard';
import Helmet from "react-helmet";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';


const QuestionsPage = () => {
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
      setAge(event.target.value);
    
    };
//======================================================================================
//Navigate to Ask Question
    const navigate = useNavigate();

    const askNewQuestion = () => {
        navigate('/newquestion')
    }

//========================================================================================
//Display All Questions
//read products
const [questions, setQuestions] = useState();
const [updateQuestions, setUpdateQuestions] = useState();

useEffect(()=>{

  axios.get('http://localhost:5000/api/readquestions')
  .then(res =>{

    let questionData = res.data;
    let renderQuestions = questionData.map((item) => <QuestionCard key={item._id} questionId={item._id} date={item.datePosted} title={item.title} description={item.description} upvotes={item.upvotes} downvotes={item.downvotes} userId={item.userId}  editRender={setUpdateQuestions}/>)
    setQuestions(renderQuestions);
    setUpdateQuestions(false);

  })
  .catch(err => console.log(err));

},[updateQuestions]);


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
            Sharing is caring - especially when it comes to knowledge. So please don’t hesitate to ask or answer!
            </p>
            <Button onClick={askNewQuestion}
              sx={{
                backgroundColor: "#FF7900",
                borderRadius: "20px",
                height: "43px",
                textTransform: 'capitalize',
                marginTop: "20px",
                width: "140px",
                fontFamily: "Open Sans",
                "&:hover": {
                  backgroundColor: "#FF7900",
                },
              }}
              variant="contained"
            >
              Ask A Question
            </Button>
          </div>
          <div className='pp_welcome_banner-img'></div>

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
                  <MenuItem value={10}>1st Year</MenuItem>
                  <MenuItem value={20}>2nd Year</MenuItem>
                  <MenuItem value={30}>3rd Year</MenuItem>
                  
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 200, width: "140px", margin: "20px"}}>
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
                
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>{" "}
          </div>
          <div>
            <Button onClick={askNewQuestion}
              sx={{
                backgroundColor: "#2b2b2b",
                borderRadius: "20px",
                marginTop: "20px",
                width: "150 px",
                textTransform: 'capitalize',
                height: '45px',
                fontFamily: "Open Sans",
                "text-transform": "none",
                "&:hover": {
                  backgroundColor: "#FF7900",
                },
              }}
              variant="contained"
            >
              Ask A Question
            </Button>
          </div>
        </div>
        <div className='question-card-con'>
                {questions}
            </div>
      </div>
    </div>
            
    );
};

export default QuestionsPage;