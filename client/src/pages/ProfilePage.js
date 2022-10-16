import React from 'react';
import '../css/profilePage.css';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router";

import fishUnlockImage from '../assets/profilePageAssets/fishUnlock.png';
import fishLockImage from '../assets/profilePageAssets/fishLock.png';
import yarn from '../assets/profilePageAssets/yarn.png';
import wizard from '../assets/profilePageAssets/wizard.png';
import star from '../assets/profilePageAssets/star.png';
import profilePicture from '../assets/placeholderPP.png';
import Delete from '../assets/profilePageAssets/delete.png';
import UpVote from '../assets/profilePageAssets/upVote.png';
import DownVote from '../assets/profilePageAssets/downVote.png';
import Helmet from "react-helmet";
import { motion } from "framer-motion";
import QuestionCard from '../components/QuestionCard';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DeleteAccountModal from '../modals/DeleteAccountModal';

const ProfilePage = () => {

   const activeUser = sessionStorage.getItem("id");

   const navigate = useNavigate();

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [questions, setQuestions] = useState();
    const [questionCount, setQuestionCount] = useState();

    const [deleteModal, setDeleteModal] = useState();



    useEffect(() => {

        Axios.get('http://localhost:5000/api/readquestions')
        .then(res =>{
      
          let questionData = res.data;
          let questions = questionData.filter(user => user.userId === activeUser).map((item) => <QuestionCard key={item._id} questionId={item._id} date={item.datePosted} title={item.title} description={item.description} upvotes={item.upvotes} downvotes={item.downvotes} userId={item.userId}/>)
          setQuestions(questions);
      
        })
        .catch(err => console.log(err));

        // Question Counter for Badges
        // setQuestionCount(questions.length);
        // console.log(questionCount);

        
      
      },[value]);


      const deleteItem = () => {
        // console.log(id);

        setDeleteModal(<DeleteAccountModal
            close={setDeleteModal}
          />)
    }

   



    return (


        <div>
            {deleteModal}
        <motion.div className='pp_main_card'
            intital={{ width: 0 }}
            animate={{ width: "76%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className='pp_welcome_con'>
                <div className='pp_welcome_banner'>
                    <h1>Hi Friend,</h1>
                    <p>We love that you've joined us! Lets take a look at all things YOU! View your rank, badges, questions and more! </p>
                    <Button sx={{
                        backgroundColor: '#FF7900', height: '42px', borderRadius: '20px', marginTop: "20px", width: 'auto', fontFamily: 'Open Sans', textTransform: 'capitalize',
                        '&:hover': {
                            backgroundColor: '#FF7900',
                        }
                    }} variant="contained">View Questions</Button>
                </div>

                <div className='pp_welcome_banner_img'></div>

            </div>


            <div className='pp_rank_score_con'>

                <div className='pp_rank_con'>
                    <h2>Your Rank:</h2>
                    <div className='pp_rank_img_con'>

                        <div className='pp_rank'>
                            {/* <div className='pp_rank_img'></div> */}
                            <img src={fishUnlockImage} alt="img" className='pp_rank_img'></img>
                            <p>Bronze</p>
                        </div>

                        <div className='pp_rank'>
                            <img src={fishLockImage} alt="img" className='pp_rank_img'></img>
                            <p>Silver</p>
                        </div>

                        <div className='pp_rank'>
                            <img src={fishLockImage} alt="img" className='pp_rank_img'></img>
                            <p>Gold</p>
                        </div>

                        <div className='pp_rank'>
                            <img src={fishLockImage} alt="img" className='pp_rank_img'></img>
                            <p>Platinum</p>
                        </div>

                        <div className='pp_rank'>
                            <img src={fishLockImage} alt="img" className='pp_rank_img'></img>
                            <p>Diamond</p>
                        </div>

                    </div>
                </div>


                <div className='pp_score_con'>
                    <p>Your</p>
                    <h2>Reliability Score:</h2>
                    <div className='pp_score_con_score'>
                        <h1>23</h1>
                        <p>/100</p>
                    </div>
                </div>

            </div>



            <div className='pp_badges_con'>
                <h2>Your Badges:</h2>
                <div className='pp_badge_card_slide'>

                    <div className='pp_badge_card'>
                        <img src={yarn} alt="img"></img>
                        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
                        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
                    </div>

                    <div className='pp_badge_card'>
                        <img src={star} alt="img"></img>
                        <p className='pp_badge_heading'>Gold Star</p>
                        <p className='pp_badge_desc'>What a champ! You've answered 10 questions!</p>
                    </div>

                    <div className='pp_badge_card'>
                        <img src={wizard} alt="img"></img>
                        <p className='pp_badge_heading'>A Hat for Our Wiz</p>
                        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
                    </div>

                    <div className='pp_badge_card'>
                        <img src={yarn} alt="img"></img>
                        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
                        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
                    </div>

                </div>
            </div>


            <div className='pp_activity_con'>

                <TabContext value={value} className='admin__links'>
                    <div className='admin__links__tablinks'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" >
                                <Tab label="Questions" value="1" indicatorColor="secondary" />
                                <Tab label="Answers" value="2" />
                            </TabList>
                        </Box>
                    </div>

                    <TabPanel value="1">
                        {questions}
                    </TabPanel>

                    {/* Reported user Table */}
                    <TabPanel value="2">
                        {/* <QuestionCard /> */}
                    </TabPanel>


                </TabContext>

                {/* <p className='pp_questions_btn'>Questions</p>
                <p className='pp_answers_btn'>Answers</p> */}

                <div className='pp_userInput_card_con'>
                    {/* <QuestionCard/>
                        <QuestionCard/>
                        <QuestionCard/> */}


                </div>

            </div>

            <Button sx={{
                backgroundColor: '#2b2b2b', float: 'right', borderRadius: '20px', height: '45px', marginTop: "150px", textTransform: 'capitalize', marginRight: "50px", width: '200px', fontFamily: 'Open Sans',
                '&:hover': {
                    backgroundColor: '#2b2b2b',
                }
            }} variant="contained" onClick={deleteItem}>Delete my Account</Button>
        </motion.div>
</div>
    );
};

export default ProfilePage;