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
import { AnswerCard } from '../components/AnswerCard'
// import { trusted } from 'mongoose';

const ProfilePage = () => {

    const activeUser = sessionStorage.getItem("id");

    const navigate = useNavigate();

    const [adminStatus, setAdminStatus] = useState();

    const [value, setValue] = useState('1');

    const [questionAmmount, setQuestionAmmount] = useState();

    const [eligibility, setEligibility] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let badgeOneCheck = true;
    const badgeOne = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeTwoCheck = false;
    const badgeTwo = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeThreeCheck = false;
    const badgeThree = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeFourCheck = false;
    const badgeFour = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeFiveCheck = false;
    const badgeFive = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeSixCheck = false;
    const badgeSix = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeSevenCheck = false;
    const badgeSeven = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeEightCheck = false;
    const badgeEight = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeNineCheck = false;
    const badgeNine = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeTenCheck = false;
    const badgeTen = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeElevenCheck = false;
    const badgeEleven = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeTwelveCheck = false;
    const badgeTwelve = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeThirteenCheck = false;
    const badgeThirteen = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeFourteenCheck = false;
    const badgeFourteen = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeFifteenCheck = false;
    const badgeFifteen = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeSixteenCheck = false;
    const badgeSixteen = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeSeventeenCheck = false;
    const badgeSeventeen = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeEighteenCheck = false;
    const badgeEighteen = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeNineteenCheck = false;
    const badgeNineteen = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;

    let badgeTwentyCheck = false;
    const badgeTwenty = <div className='pp_badge_card'>
        <img src={yarn} alt="img"></img>
        <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
        <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
    </div>;



    const [questions, setQuestions] = useState();
    const [answers, setAnswers] = useState();
    const [questionCount, setQuestionCount] = useState();
    const [answerCount, setAnswerCount] = useState();

    const [usersRank, setUsersRank] = useState();
    const [userEmail, setUserEmail] = useState();

    const [deleteModal, setDeleteModal] = useState();

    const [bronze, setBronze] = useState(true)
    const [silver, setSilver] = useState(false)
    const [gold, setGold] = useState(false)
    const [platinum, setPlatinum] = useState(false)
    const [diamond, setDiamond] = useState(false)

    const [reliability, setReliability] = useState(0)

    var numUpVotesQuestions = 0;
    let [upVotesQuestions, setUpVotesQuestions] = useState();
    var numDownVotesQuestions = 0;
    let [downVotesQuestions, setDownVotesQuestions] = useState();

    var totalUpVotes = 0;
    var totalDownVotes = 0;

    var numUpVotesAnswers = 0;
    let [upVotesAnswers, setUpVotesAnswers] = useState();
    var numDownVotesAnswers = 0;
    let [downVotesAnswers, setDownVotesAnswers] = useState();

    useEffect(() => {

        Axios.get('http://localhost:5000/api/readquestions')
            .then(res => {

                let questionData = res.data;
                // console.log(questionData)
                let questions = questionData.filter(user => user.userId === activeUser).map((item) =>
                    <QuestionCard
                        key={item._id}
                        questionId={item._id}
                        date={item.datePosted}
                        title={item.title}
                        description={item.description}
                        upvotes={item.upvotes}
                        downvotes={item.downvotes}
                        userId={item.userId} />)
                setQuestions(questions);

                // setQuestionAmmount(questionData.upvotes);

                questionData.filter(user => user.userId === activeUser).forEach((val) => {
                    numUpVotesQuestions += val.upvotes;
                    numDownVotesQuestions += val.downvotes;
                });

                setUpVotesQuestions(numUpVotesQuestions)
                setDownVotesQuestions(numDownVotesQuestions)
                // console.log("Up Votes Questions: " + numUpVotesQuestions + " " + "Down Votes Questions: " + numDownVotesQuestions);

            })
            .catch(err => console.log(err));

        // Question Counter for Badges
        // setQuestionCount(questions.length);
        // console.log(questionCount);

        Axios.get('http://localhost:5000/api/readanswer')
            .then(res => {

                let answerData = res.data;
                let answers = answerData.filter(user => user.userId === activeUser).map((item) =>
                    <AnswerCard
                        key={item._id}
                        questionId={item._id}
                        date={item.datePosted}
                        code={item.code}
                        screenshots={item.screenshots}
                        description={item.description}
                        upvotes={item.upvotes}
                        downvotes={item.downvotes}
                        userId={item.userId}
                    />)
                setAnswers(answers);


                answerData.filter(user => user.userId === activeUser).forEach((val) => {
                    numUpVotesAnswers += val.upvotes;
                    numDownVotesAnswers += val.downvotes;
                });

                setUpVotesAnswers(numUpVotesAnswers)
                setDownVotesAnswers(numDownVotesAnswers)
                // console.log("Up Votes Answers: " + numUpVotesAnswers + " " + "Down Votes Answers: " + numDownVotesAnswers);

            })
            .catch(err => console.log(err));


        totalUpVotes = upVotesQuestions + upVotesAnswers;
        totalDownVotes = downVotesQuestions + downVotesAnswers;

        // Question Counter for Badges
        //   setAnswerCount(answers.length);
        //   console.log(questionCount);


        setReliability(totalUpVotes - totalDownVotes);
        // console.log("Down Votes: " + totalDownVotes);
        // console.log("Up Votes: " + totalUpVotes);
        // console.log("Reliability Score: " + reliability);


        if (reliability > 20 && reliability < 40) {
            setBronze(false);
            setSilver(true);
            setGold(false);
            setPlatinum(false);
            setDiamond(false);


            let payload = {
                rank: "Silver"
            }


            Axios.patch('http://localhost:5000/api/updateuser/:id' + activeUser, payload)
                .then((res) => {
                    if (res) {
                        console.log("User Updated");

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

        if (reliability > 40 && reliability < 60) {
            setBronze(false);
            setSilver(false);
            setGold(true);
            setPlatinum(false);
            setDiamond(false);


            let payload = {
                rank: "Gold"
            }


            Axios.patch('http://localhost:5000/api/updateuser/:id' + activeUser, payload)
                .then((res) => {
                    if (res) {
                        console.log("User Updated");

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });


        }

        if (reliability > 60 && reliability < 100) {
            setBronze(false);
            setSilver(false);
            setGold(false);
            setPlatinum(true);
            setDiamond(false);


            let payload = {
                rank: "Platinum"
            }


            Axios.patch('http://localhost:5000/api/updateuser/:id' + activeUser, payload)
                .then((res) => {
                    if (res) {
                        console.log("User Updated");

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });


        }

        if (reliability > 99) {
            setBronze(false);
            setSilver(false);
            setGold(false);
            setPlatinum(false);
            setDiamond(true);
        }


        Axios.get("http://localhost:5000/api/userInfo/" + activeUser).then((res) => {
            let data = res.data;
            setUsersRank(data.rank);
            setUserEmail(data.email);
        });
        
        // console.log(userEmail)


    }, [questions]);


    // console.log(totalDownVotes / totalUpVotes * 100)

    if (reliability > 100) {
        setReliability(100)
    }


    if (reliability > 100 && questionCount.length > 20) {
        setEligibility(true);
    }


    const deleteItem = () => {
        // console.log(id);

        setDeleteModal(<DeleteAccountModal
            close={setDeleteModal}
        />)
    }



    useEffect(() => {


        Axios.get('http://localhost:5000/api/getadminreq')
            .then(res => {
                let data = res.data;

                console.log(data);

                data.filter(user => user.userId === activeUser).forEach((val) => {
                    setAdminStatus(val.requestStatus);
                    console.log(adminStatus);
                });


            })

        // console.log(adminStatus);





        if (reliability === 100 && eligibility === true && usersRank === "Diamond") {

            let adminPermissions = {
                reliability: reliability,
                requestStatus: false,
                userId: activeUser,
                userEmail: userEmail
            }


            Axios.post('http://localhost:5000/api/adminreq', adminPermissions)
                .then((res) => {
                    if (res) {
                        console.log("Added Admin Request");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }


        if (reliability === 100 && eligibility === true && adminStatus === true) {

            let payload = {
                rank: usersRank
            }


            Axios.patch('http://localhost:5000/api/updateuser/:id' + activeUser, payload)
                .then((res) => {
                    if (res) {
                        console.log("User Updated");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

    }, []);






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
                            backgroundColor:
                                '#FF7900',
                            height: '42px',
                            borderRadius: '20px',
                            marginTop: "20px",
                            width: 'auto',
                            fontFamily: 'Open Sans',
                            textTransform: 'capitalize',
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
                                <img src={bronze === true ? fishUnlockImage : fishLockImage} alt="img" className='pp_rank_img'></img>
                                <p>Bronze</p>
                            </div>

                            <div className='pp_rank'>
                                <img src={silver === true ? fishUnlockImage : fishLockImage} alt="img" className='pp_rank_img'></img>
                                <p>Silver</p>
                            </div>

                            <div className='pp_rank'>
                                <img src={gold === true ? fishUnlockImage : fishLockImage} alt="img" className='pp_rank_img'></img>
                                <p>Gold</p>
                            </div>

                            <div className='pp_rank'>
                                <img src={platinum === true ? fishUnlockImage : fishLockImage} alt="img" className='pp_rank_img'></img>
                                <p>Platinum</p>
                            </div>

                            <div className='pp_rank'>
                                <img src={diamond === true ? fishUnlockImage : fishLockImage} alt="img" className='pp_rank_img'></img>
                                <p>Diamond</p>
                            </div>

                        </div>
                    </div>


                    <div className='pp_score_con'>
                        <p>Your</p>
                        <h2>Reliability Score:</h2>
                        <div className='pp_score_con_score'>
                            <h1>{reliability}</h1>
                            <p>/100</p>
                        </div>
                    </div>

                </div>



                <div className='pp_badges_con'>
                    <h2>Your Badges:</h2>
                    <div className='pp_badge_card_slide'>

                        {badgeOneCheck === true ? badgeOne : ""}
                        {badgeTwoCheck === true ? badgeTwo : ""}
                        {badgeThreeCheck === true ? badgeThree : ""}
                        {badgeFourCheck === true ? badgeFour : ""}
                        {badgeFiveCheck === true ? badgeFive : ""}
                        {badgeSixCheck === true ? badgeSix : ""}
                        {badgeSevenCheck === true ? badgeSeven : ""}
                        {badgeEightCheck === true ? badgeEight : ""}
                        {badgeNineCheck === true ? badgeNine : ""}
                        {badgeTenCheck === true ? badgeTen : ""}
                        {badgeElevenCheck === true ? badgeEleven : ""}
                        {badgeTwelveCheck === true ? badgeTwelve : ""}
                        {badgeThirteenCheck === true ? badgeThirteen : ""}
                        {badgeFourteenCheck === true ? badgeFourteen : ""}
                        {badgeFifteenCheck === true ? badgeFifteen : ""}
                        {badgeSixteenCheck === true ? badgeSixteen : ""}
                        {badgeSeventeenCheck === true ? badgeSeventeen : ""}
                        {badgeEighteenCheck === true ? badgeEighteen : ""}
                        {badgeNineteenCheck === true ? badgeNineteen : ""}
                        {badgeTwentyCheck === true ? badgeTwenty : ""}



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
                            {answers}
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
                    backgroundColor: '#2b2b2b',
                    float: 'right',
                    borderRadius: '20px',
                    height: '45px',
                    marginTop: "150px",
                    textTransform: 'capitalize',
                    marginRight: "50px",
                    width: '200px',
                    fontFamily: 'Open Sans',
                    '&:hover': {
                        backgroundColor: '#2b2b2b',
                    }
                }} variant="contained" onClick={deleteItem}>Delete my Account</Button>
            </motion.div>
        </div>
    );
};

export default ProfilePage;