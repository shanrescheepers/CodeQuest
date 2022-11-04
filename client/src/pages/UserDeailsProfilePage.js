import React from 'react';
import '../css/profilePage.css';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router";
import fishUnlockImage from '../assets/profilePageAssets/fishUnlock.png';
import fishLockImage from '../assets/profilePageAssets/fishLock.png';
import Helmet from "react-helmet";
import { motion } from "framer-motion";
import ProfileQuestionCard from '../components/ProfileQuestionCard';
import ProfileAnswerCard from '../components/ProfileAnswerCard';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FirstQuestionAward from '../components/QuestionAwardBadges/FirstQuestionAward';
import SecondQuestionAward from '../components/QuestionAwardBadges/SecondQuestionAward';
import ThirdQuestionAward from '../components/QuestionAwardBadges/ThirdQuestionAward';
import FourthQuestionAward from '../components/QuestionAwardBadges/FourthQuestionAward';
import FifthQuestionAward from '../components/QuestionAwardBadges/FifthQuestionAward';
import SixthQuestionAward from '../components/QuestionAwardBadges/SixthQuestionAward';
import SeventhQuestionAward from '../components/QuestionAwardBadges/SeventhQuestionAward';
import EighthQuestionAward from '../components/QuestionAwardBadges/EighthQuestionAward';
import FirstAnswerAward from '../components/AnswerAwardBadges/FirstAnswerAward';
import SecondAnswerAward from '../components/AnswerAwardBadges/SecondAnswerAward';
import ThirdAnswerAward from '../components/AnswerAwardBadges/ThirdAnswerAward';
import FourthAnswerAward from '../components/AnswerAwardBadges/FourthAnswerAward';
import FifthAnswerAward from '../components/AnswerAwardBadges/FifthAnswerAward';
import SixthAnswerAward from '../components/AnswerAwardBadges/SixthAnswerAward';
import SeventhAnswerAward from '../components/AnswerAwardBadges/SeventhAnswerAward';
import EighthAnswerAward from '../components/AnswerAwardBadges/EighthAnswerAward';
import SilverAward from '../components/RankAwardBadges/SilverAward';
import GoldAward from '../components/RankAwardBadges/GoldAward';
import DiamondAward from '../components/RankAwardBadges/DiamondAward';
import PlatinumAward from '../components/RankAwardBadges/PlatinumAward';
import { ArrowBackRounded } from '@mui/icons-material';
import axios from 'axios';
import EditBioModal from '../modals/EditBioModal';
import AddBioModal from '../modals/AddBioModal';

const UserDeailsProfilePage = () => {
    const theme = createTheme({
        palette: {
            progress: {
                main: '#FF7900',
                contrastText: '#fff',
            },
        },
    });

    const loggedInUser = sessionStorage.getItem("id")
    const userProfileId = sessionStorage.getItem("userDetails");
    const [username, setUsername] = useState();
    const [profilePic, setProfilePic] = useState();
    const [year, setYear] = useState()
    const [userBio, setUserBio] = useState('');
    const [editBioModal, setEditBioModal] = useState();
    const [addBioModal, setAddBioModal] = useState();
    const [renderUserBio, setRenderUserBio] = useState(false);
    const [userBioId, setUserBioId] = useState();

    const goBack = () => {
        navigate(-1);
    }

    //show add modal
    const addBio = () => {
        setAddBioModal(<AddBioModal userId={loggedInUser} addRender={setRenderUserBio} close={setAddBioModal} />);
    };

    useEffect(() => {

        //hide add and edit bio buttons if the user logged in isn't viewing their own 
        if(loggedInUser !== userProfileId){
            document.getElementById('add-button').style.display = 'none';
            document.getElementById('edit-button').style.display = 'none';
        }

        //get user information 
        Axios.get('http://localhost:5000/api/userInfo/' + userProfileId)
        .then((res) => {
            console.log(res.data);

            let userInfo = res.data;
            setUsername(userInfo.username);
            setProfilePic(userInfo.profileimage);
            setYear(userInfo.yearlevel);
        })
    }, []);

    useEffect(() => { 
        Axios.get("http://localhost:5000/api/readbio")
        .then((res) => {
            let data = res.data;

            // read user bio
            let bioDesc = '';
            let bioId = '';

            data.filter(user => user.userBioId === userProfileId).map((item) =>
                bioDesc = item.description
            )

            data.filter(user => user.userBioId === userProfileId).map((item) =>
                bioId = item._id
            )

            setUserBioId(bioId)
            setUserBio(bioDesc);
            setRenderUserBio(false);

            //hide add/edit button depending on whether or not there is a bio
            if(bioDesc != ''){
                document.getElementById('add-button').style.display = 'none';
            } else {
                document.getElementById('edit-button').style.display = 'none';
            }
        })
        .catch((err) => {
            console.log('There is an error: ' + err)
        });
    }, [renderUserBio]);


    //show edit modal 
    const editBio = () => {
        setEditBioModal(<EditBioModal id={userBioId} userId={userProfileId} description={userBio} editRender={setRenderUserBio} close={setEditBioModal} />);
    };

    //get profile image path
    const imgURL = "Avatars/" + profilePic + ".png";

    //set background colour of user profile pic
    let bgColor = "";

    if (year === 1) {
      bgColor = "#6EEB83";
    } else if (year === 2) {
      bgColor = "#6CD4FF";
    } else {
      bgColor = "#FF7900";
    }

    const [adminStatus, setAdminStatus] = useState();

    const [value, setValue] = useState('1');

    const [questionAmmount, setQuestionAmmount] = useState();

    const [eligibility, setEligibility] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let badgeOneCheck = false;
    const badgeOne = <FirstQuestionAward />

    let badgeTwoCheck = false;
    const badgeTwo = <SecondQuestionAward />

    let badgeThreeCheck = false;
    const badgeThree = <ThirdQuestionAward />

    let badgeFourCheck = false;
    const badgeFour = <FourthQuestionAward />

    let badgeFiveCheck = false;
    const badgeFive = <FifthQuestionAward />

    let badgeSixCheck = false;
    const badgeSix = <SixthQuestionAward />

    let badgeSevenCheck = false;
    const badgeSeven = <SeventhQuestionAward />

    let badgeEightCheck = false;
    const badgeEight = <EighthQuestionAward />

    let badgeNineCheck = false;
    const badgeNine = <FirstAnswerAward />

    let badgeTenCheck = false;
    const badgeTen = <SecondAnswerAward />

    let badgeElevenCheck = false;
    const badgeEleven = <ThirdAnswerAward />

    let badgeTwelveCheck = false;
    const badgeTwelve = <FourthAnswerAward />

    let badgeThirteenCheck = false;
    const badgeThirteen = <FifthAnswerAward />

    let badgeFourteenCheck = false;
    const badgeFourteen = <SixthAnswerAward />

    let badgeFifteenCheck = false;
    const badgeFifteen = <SeventhAnswerAward />

    let badgeSixteenCheck = false;
    const badgeSixteen = <EighthAnswerAward />

    let badgeSilverCheck = false;
    const badgeSilver = <SilverAward />

    let badgeGoldCheck = false;
    const badgeGold = <GoldAward />

    let badgePlatinumnCheck = false;
    const badgePlatinum = <PlatinumAward />

    let badgeDiamondCheck = false;
    const badgeDiamond = <DiamondAward />

    const [questions, setQuestions] = useState();
    const [answers, setAnswers] = useState();
    const [answerCount, setAnswerCount] = useState();

    const [usersRank, setUsersRank] = useState();
    const [userEmail, setUserEmail] = useState();

    const [deleteModal, setDeleteModal] = useState();

    const [bronze, setBronze] = useState(true)
    const [silver, setSilver] = useState(false)
    const [gold, setGold] = useState(false)
    const [platinum, setPlatinum] = useState(false)
    const [diamond, setDiamond] = useState(false)

    const [reliability, setReliability] = useState(0);
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

    const [adminButtonCheck, setAdminButtonCheck] = useState("none");

    useEffect(() => {

        Axios.get('http://localhost:5000/api/readquestions')
        .then(res => {

            let questionData = res.data;

            let questions = questionData.filter(user => user.userId === userProfileId).map((item) =>
                <ProfileQuestionCard
                    key={item._id}
                    questionId={item._id}
                    date={item.datePosted}
                    title={item.title}
                    description={item.description}
                    upvotes={item.upvotes}
                    downvotes={item.downvotes}
                    userId={item.userId} />)
            setQuestions(questions);

            setQuestionAmmount(questions.length);

            questionData.filter(user => user.userId === userProfileId).forEach((val) => {
                numUpVotesQuestions += val.upvotes;
                numDownVotesQuestions += val.downvotes;
            });

            setUpVotesQuestions(numUpVotesQuestions)
            setDownVotesQuestions(numDownVotesQuestions)
        })
        .catch(err => console.log(err));

        Axios.get('http://localhost:5000/api/readAllAnswers')
        .then(res => {

            let answerData = res.data;
            let answers = answerData.filter(user => user.userId === userProfileId).map((item) =>
                <ProfileAnswerCard
                    key={item._id}
                    answerId={item._id}
                    date={item.datePosted}
                    code={item.code}
                    screenshots={item.screenshots}
                    description={item.description}
                    upvotes={item.upvotes}
                    downvotes={item.downvotes}
                    userId={item.userId}
                />)
            setAnswers(answers);

            setAnswerCount(answers.length);

            answerData.filter(user => user.userId === userProfileId).forEach((val) => {
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

        setReliability(totalUpVotes - totalDownVotes);

        if (reliability > 20 && reliability < 40) {
            setBronze(false);
            setSilver(true);
            setGold(false);
            setPlatinum(false);
            setDiamond(false);

            badgeSilverCheck = true;

            let payload = {
                rank: "Silver"
            }

            Axios.patch('http://localhost:5000/api/updateuser/:id' + userProfileId, payload)
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

            badgeSilverCheck = true;
            badgeGoldCheck = true;

            let payload = {
                rank: "Gold"
            }

            Axios.patch('http://localhost:5000/api/updateuser/:id' + userProfileId, payload)
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

            badgeSilverCheck = true;
            badgeGoldCheck = true;
            badgePlatinumnCheck = true;
            badgeDiamondCheck = false;

            let payload = {
                rank: "Platinum"
            }

            Axios.patch('http://localhost:5000/api/updateuser/:id' + userProfileId, payload)
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

            badgeSilverCheck = true;
            badgeGoldCheck = true;
            badgePlatinumnCheck = true;
            badgeDiamondCheck = true;
        }

        Axios.get("http://localhost:5000/api/userInfo/" + userProfileId).then((res) => {
            let data = res.data;
            setUsersRank(data.rank);
            setUserEmail(data.email);
        });

        Axios.get('http://localhost:5000/api/getadminreq')
            .then(res => {
                let data = res.data;

                data.filter(user => user.userId === userProfileId).forEach((val) => {
                    setAdminStatus(val.requestStatus);
                });
            })

    }, [questions]);

    useEffect(() => {
        if (reliability > 100) {
            setReliability(100)
        }

        if (reliability > 100 && questionAmmount.length > 20) {
            setEligibility(true);
        }

        if (reliability === 100 && eligibility === true && usersRank === "Platinum") {
            setAdminButtonCheck("block");
        }

        if (reliability === 100 && eligibility === true && adminStatus === true) {

            let payload = {
                rank: "Diamond"
            }

            Axios.patch('http://localhost:5000/api/updateuser/:id' + userProfileId, payload)
            .then((res) => {
                if (res) {
                    console.log("User Updated");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }

    }, [questions])

    if (questionAmmount > 0) {
        badgeOneCheck = true;
    }

    if (questionAmmount >= 5) {
        badgeTwoCheck = true;
    }

    if (questionAmmount >= 10) {
        badgeThreeCheck = true;
    }

    if (questionAmmount >= 20) {
        badgeFourCheck = true;
    }

    if (questionAmmount >= 25) {
        badgeFiveCheck = true;
    }

    if (questionAmmount >= 50) {
        badgeSixCheck = true;
    }

    if (questionAmmount >= 75) {
        badgeSevenCheck = true;
    }

    if (questionAmmount >= 100) {
        badgeEightCheck = true;
    }

    if (answerCount > 0) {
        badgeNineCheck = true;
    }

    if (answerCount >= 5) {
        badgeTenCheck = true;
    }

    if (answerCount >= 10) {
        badgeElevenCheck = true;
    }

    if (answerCount >= 20) {
        badgeTwelveCheck = true;
    }

    if (answerCount >= 25) {
        badgeThirteenCheck = true;
    }

    if (answerCount >= 50) {
        badgeFourteenCheck = true;
    }

    if (answerCount >= 75) {
        badgeFifteenCheck = true;
    }

    if (answerCount >= 100) {
        badgeSixteenCheck = true;
    }

    const buttonStyle = {
        backgroundColor: '#FF7900',
        borderRadius: '50px',
        height: '42px',
        marginTop: '16px',
        marginRight: '16px',
        width: 'auto',
        padding: '16px 24px',
        fontFamily: 'Open Sans',
        textTransform: 'capitalize',
        '&:hover': {
            background: 'FF7900',
            color: '#2B2B2B'
        }
    }

    return (
        <div>
            {editBioModal}
            {addBioModal}
            <motion.div className='pp_main_card'
                initial={{ width: 0 }}
                animate={{ width: "76.8%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
            >

            <Helmet>
                <title>User Profile</title>
            </Helmet>

            <div className='feed-header'>
                <div className='back-arrow' onClick={goBack}>
                    <ArrowBackRounded sx={{fontSize:'40px', color:'#FFFFFF'}}/>
                </div>

                <div className='header-con'>

                    <div className='home-header-text'>
                        <h1>{username}'s Profile</h1>
                        <p width='300px'>{userBio}</p>
                        <Button id='add-button' variant='contained' disableElevation style={buttonStyle} onClick={addBio}>Add Bio</Button>
                        <Button id='edit-button' variant='contained' disableElevation style={buttonStyle} onClick={editBio}>Edit Bio</Button>
                    </div>

                    <div className='profileDetailsCircle' style={{ backgroundColor: bgColor }}>
                        <img className='user-details-profile-pic' src={imgURL}/>
                    </div>
                </div>
            </div>

            <div className='pp_rank_score_con'>

                <div className='pp_rank_con'>
                    <h2>{username}'s Rank:</h2>
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
                    <p>{username}'s</p>
                    <h2>Reliability Score:</h2>
                    <div className='pp_score_con_score'>
                        <ThemeProvider theme={theme}>
                            <CircularProgress color="progress" variant="determinate" size={120} value={reliability} />
                        </ThemeProvider>
                        <h1>{reliability}</h1>
                    </div>
                </div>

            </div>

            <div className='pp_badges_con'>
                <h2>{username}'s Badges:</h2>
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
                    {badgeSilverCheck === true ? badgeSilver : ""}
                    {badgeGoldCheck === true ? badgeGold : ""}
                    {badgePlatinumnCheck === true ? badgePlatinum : ""}
                    {badgeDiamondCheck === true ? badgeDiamond : ""}
                </div>
            </div>

            <div className='pp_activity_con' id="questions">

                <TabContext value={value} className='admin__links'>
                    <div className='admin__links__tablinks'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" >
                                <Tab label="Questions" value="1" indicatorColor="secondary" />
                                <Tab label="Answers" value="2" />
                            </TabList>
                        </Box>
                    </div>

                    <TabPanel id='questions' value="1">
                        {questions}
                    
                    </TabPanel>

                    <TabPanel value="2">
                        {answers}
                    </TabPanel>


                </TabContext>
            </div>

            </motion.div>
        </div>
    );
};

export default UserDeailsProfilePage;