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
// import QuestionCardProfile from '../components/QuestionCardProfile';

import ProfileQuestionCard from '../components/ProfileQuestionCard';
import ProfileAnswerCard from '../components/ProfileAnswerCard';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import DeleteAccountModal from '../modals/DeleteAccountModal';
import { AnswerCard } from '../components/AnswerCard'

import { createTheme, ThemeProvider } from '@mui/material/styles';

import DeleteModal from '../modals/DeleteModal'

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

import FirstQuestionModal from '../modals/AwardModals/QuestionAskedModals/FirstQuestionModal';
import SecondQuestionModal from '../modals/AwardModals/QuestionAskedModals/SecondQuestionModal';
import ThirdQuestionModal from '../modals/AwardModals/QuestionAskedModals/ThirdQuestionModal';
import FourthQuestionModal from '../modals/AwardModals/QuestionAskedModals/FourthQuestionModal';
import FifthAnswerModal from '../modals/AwardModals/QuestionAskedModals/FifthAnswerModal';
import SixthAnswerModal from '../modals/AwardModals/QuestionAskedModals/SixthAnswerModal';
import SeventhAnswerModal from '../modals/AwardModals/QuestionAskedModals/SeventhAnswerModal';
import EighthAnswerModal from '../modals/AwardModals/QuestionAskedModals/EighthAnswerModal';

import FirstUpvoteModal from '../modals/AwardModals/UpvoteModals/FirstUpvoteModal';
import SecondUpvoteModal from '../modals/AwardModals/UpvoteModals/SecondUpvoteModal';
import ThirdUpvoteModal from '../modals/AwardModals/UpvoteModals/ThirdUpvoteModal';
import FourthUpvoteModal from '../modals/AwardModals/UpvoteModals/FourthUpvoteModal';
import FifthUpvoteModal from '../modals/AwardModals/UpvoteModals/FifthUpvoteModal';
import SixthUpvoteModal from '../modals/AwardModals/UpvoteModals/SixthUpvoteModal';
import SeventhUpvoteModal from '../modals/AwardModals/UpvoteModals/SeventhUpvoteModal';
import EighthUpvoteModal from '../modals/AwardModals/UpvoteModals/EighthUpvoteModal';

import SilverRankModal from '../modals/AwardModals/RankAwardModal/SilverRankModal';
import GoldRankModal from '../modals/AwardModals/RankAwardModal/GoldRankModal';
import DiamondRankModal from '../modals/AwardModals/RankAwardModal/DiamondRankModal';

import SilverAward from '../components/RankAwardBadges/SilverAward';
import GoldAward from '../components/RankAwardBadges/GoldAward';
import DiamondAward from '../components/RankAwardBadges/DiamondAward';
import PlatinumAward from '../components/RankAwardBadges/PlatinumAward';
// import SliverAward from '../components/RankAwardBadges/SliverAward';
// import { trusted } from 'mongoose';

const ProfilePage = () => {


    const theme = createTheme({
        palette: {
            progress: {
                main: '#FF7900',
                contrastText: '#fff',
            },
        },
    });


    const activeUser = sessionStorage.getItem("id");

    const [adminStatus, setAdminStatus] = useState();

    const [value, setValue] = useState('1');

    const [questionAmmount, setQuestionAmmount] = useState();

    const [eligibility, setEligibility] = useState(false);

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



    // Modals 
    // ===========================================================================================


    // const modalQuestionOne = <FirstQuestionModal />
    // const modalQuestionTwo = <SecondQuestionModal />
    // const modalQuestionThree = <ThirdQuestionModal />
    // const modalQuestionFour = <FourthQuestionModal />
    // const modalQuestionFive = <FifthAnswerModal />
    // const modalQuestionSix = <SixthAnswerModal />
    // const modalQuestionSeven = <SeventhAnswerModal />
    // const modalQuestionEight = <EighthAnswerModal />

    // const modalUpVoteOne = <FirstUpvoteModal />
    // const modalUpVoteTwo = <SecondUpvoteModal />
    // const modalUpVoteThree = <ThirdUpvoteModal />
    // const modalUpVoteFour = <FourthUpvoteModal />
    // const modalUpVoteFive = <FifthUpvoteModal />
    // const modalUpVoteSix = <SixthUpvoteModal />
    // const modalUpVoteSeven = <SeventhUpvoteModal />
    // const modalUpVoteEight = <EighthUpvoteModal />

    // const modalSilver = <SilverRankModal />
    // const modalGold = <GoldRankModal />
    // const modalPlatinum = ""
    // const modalDiamond = <DiamondRankModal />


    // const [modalQuestionOneCheck, setModalQuestionOneCheck] = useState();
    // const [modalQuestionTwoCheck, setModalQuestionTwoCheck] = useState();
    // const [modalQuestionThreeCheck, setModalQuestionThreeCheck] = useState();
    // const [modalQuestionFourCheck, setModalQuestionFourCheck] = useState();
    // const [modalQuestionFiveCheck, setModalQuestionFiveCheck] = useState();
    // const [modalQuestionSixCheck, setModalQuestionSixCheck] = useState();
    // const [modalQuestionSevenCheck, setModalQuestionSevenCheck] = useState();
    // const [modalQuestionEightCheck, setModalQuestionEightCheck] = useState();

    // const [modalUpVoteOneCheck, setModalUpVoteOneCheck] = useState();
    // const [modalUpVoteTwoCheck, setModalUpVoteTwoCheck] = useState();
    // const [modalUpVoteThreeCheck, setModalUpVoteThreeCheck] = useState();
    // const [modalUpVoteFourCheck, setModalUpVoteFourCheck] = useState();
    // const [modalUpVoteFiveCheck, setModalUpVoteFiveCheck] = useState();
    // const [modalUpVoteSixCheck, setModalUpVoteSixCheck] = useState();
    // const [modalUpVoteSevenCheck, setModalUpVoteSevenCheck] = useState();
    // const [modalUpVoteEightCheck, setModalUpVoteEightCheck] = useState();

    // const [modalSilverCheck, setModalSilverCheck] = useState();
    // const [modalGoldCheck, setModalGoldCheck] = useState();
    // const [modalPlatinumCheck, setModalPlatinumCheck] = useState();
    // const [modalDiamondCheck, setModalDiamondCheck] = useState();

    // ===========================================================================================



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

    const [adminButtonCheck, setAdminButtonCheck] = useState("none");

    const [username, setUsername] = useState();



    useEffect(()=> {
        Axios.get('http://localhost:5000/api/readquestions')
        .then(res => {

            let questionData = res.data;

            // console.log(questionData)
            let questions = questionData.filter(user => user.userId === activeUser).map((item) =>
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

            questionData.filter(user => user.userId === activeUser).forEach((val) => {
                numUpVotesQuestions += val.upvotes;
                numDownVotesQuestions += val.downvotes;
            });

            // console.log(questions.length);

            setUpVotesQuestions(numUpVotesQuestions)
            setDownVotesQuestions(numDownVotesQuestions)
            // console.log("Up Votes Questions: " + numUpVotesQuestions + " " + "Down Votes Questions: " + numDownVotesQuestions);

        })
        .catch(err => console.log(err));

    Axios.get('http://localhost:5000/api/readAllAnswers')
        .then(res => {

            let answerData = res.data;
            let answers = answerData.filter(user => user.userId === activeUser).map((item) =>
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

    setReliability(totalUpVotes - totalDownVotes);
    },[questions])


    useEffect(() => {

    

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

            badgeSilverCheck = true;
            badgeGoldCheck = true;



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

            badgeSilverCheck = true;
            badgeGoldCheck = true;
            badgePlatinumnCheck = true;
            badgeDiamondCheck = false;


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

            badgeSilverCheck = true;
            badgeGoldCheck = true;
            badgePlatinumnCheck = true;
            badgeDiamondCheck = true;
        }


        Axios.get("http://localhost:5000/api/userInfo/" + activeUser).then((res) => {
            let data = res.data;
            setUsersRank(data.rank);
            setUserEmail(data.email);
            setUsername(data.username);
        });





        Axios.get('http://localhost:5000/api/getadminreq')
            .then(res => {
                let data = res.data;

                // console.log(data);

                data.filter(user => user.userId === activeUser).forEach((val) => {
                    setAdminStatus(val.requestStatus);
                    // console.log(adminStatus);
                });


            })

        // console.log(adminStatus);








    // }, [questions]);
}, [reliability]);


    // Get Modal Values 

    // Axios.get('http://localhost:5000/api/getmodalStatus')
    //     .then(res => {

    //         let modalData = res.data;



    //         modalData.filter(user => user.userId === activeUser).forEach((val) => {
    //             setModalQuestionOneCheck(val.FirstQuestionModal);
    //             setModalQuestionTwoCheck(val.SecondQuestionModal);
    //             setModalQuestionThreeCheck(val.ThirdQuestionModal);
    //             setModalQuestionFourCheck(val.FourthQuestionModal);
    //             setModalQuestionFiveCheck(val.FifthAnswerModal);
    //             setModalQuestionSixCheck(val.SixthAnswerModal);
    //             setModalQuestionSevenCheck(val.SeventhAnswerModal);
    //             setModalQuestionEightCheck(val.EighthAnswerModal);

    //             setModalUpVoteOneCheck(val.FirstUpvoteModal);
    //             setModalUpVoteTwoCheck(val.SecondUpvoteModal);
    //             setModalUpVoteThreeCheck(val.ThirdUpvoteModal);
    //             setModalUpVoteFourCheck(val.FourthUpvoteModal);
    //             setModalUpVoteFiveCheck(val.FifthUpvoteModal);
    //             setModalUpVoteSixCheck(val.SixthUpvoteModal);
    //             setModalUpVoteSevenCheck(val.SeventhUpvoteModal);
    //             setModalUpVoteEightCheck(val.EighthUpvoteModal);

    //             setModalSilverCheck(val.SilverRankModal);
    //             setModalGoldCheck(val.GoldRankModal);
    //             // setModalPlatinumCheck(val.);
    //             setModalDiamondCheck(val.DiamondRankModal);

    //         });

    //     })
    //     .catch(err => console.log(err));


    // Awarding Badges 

    // Rank Badges 

    useEffect(() => {
        // Questions 


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


    }, [reliability])



    if (questionAmmount > 0) {
        badgeOneCheck = true;

        // console.log(modalQuestionOneCheck);
    }

    if (questionAmmount >= 5) {
        badgeTwoCheck = true;
        // console.log(modalQuestionOneCheck);
    }


    if (questionAmmount >= 10) {
        badgeThreeCheck = true;
        // console.log(questionAmmount);

    }


    if (questionAmmount >= 20) {
        badgeFourCheck = true;
        // console.log(questionAmmount);
    }

    if (questionAmmount >= 25) {
        badgeFiveCheck = true;
        // console.log(questionAmmount);

    }

    if (questionAmmount >= 50) {
        badgeSixCheck = true;
        // console.log(questionAmmount);


    }

    if (questionAmmount >= 75) {
        badgeSevenCheck = true;
        // console.log(questionAmmount);

    }

    if (questionAmmount >= 100) {
        badgeEightCheck = true;


    }


    // Answer Badges 

    if (answerCount > 0) {
        badgeNineCheck = true;
        // console.log(questionAmmount);

    }

    if (answerCount >= 5) {
        badgeTenCheck = true;
        // console.log(questionAmmount);
    }


    if (answerCount >= 10) {
        badgeElevenCheck = true;
        // console.log(questionAmmount);
    }


    if (answerCount >= 20) {
        badgeTwelveCheck = true;
        // console.log(questionAmmount);
    }

    if (answerCount >= 25) {
        badgeThirteenCheck = true;
    }

    if (answerCount >= 50) {
        badgeFourteenCheck = true;
        // console.log(questionAmmount);
    }

    if (answerCount >= 75) {
        badgeFifteenCheck = true;
    }

    if (answerCount >= 100) {
        badgeSixteenCheck = true;
        // console.log(questionAmmount);
    }

    const deleteItem = () => {
        // console.log(id);

        setDeleteModal(<DeleteAccountModal
            close={setDeleteModal}
        />)

    }



    const requestAdmin = () => {


        if (window.confirm("Request Sent! Please Wait for update.") === true) {
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
            console.log("Confirmed");
        }



    }




    // if(badgeOneCheck === true && modalQuestionOneCheck === "inActive"){
    //     let payload = {
    //         userId: activeUser,
    //         silver:'inActive',
    //         gold: 'inActive',
    //         platinum: 'inActive',
    //         diamond: 'inActive',
    //         FirstQuestionModal: 'Active',
    //         SecondQuestionModal: 'inActive',
    //         ThirdQuestionModal: 'inActive',
    //         FourthQuestionModal: 'inActive',
    //         FifthAnswerModal: 'inActive',
    //         SixthAnswerModal: 'inActive',
    //         SeventhAnswerModal: 'inActive',
    //         EighthAnswerModal: 'inActive',
    //         FirstUpvoteModal: 'inActive',
    //         SecondUpvoteModal: 'inActive',
    //         ThirdUpvoteModal: 'inActive',
    //         FourthUpvoteModal: 'inActive',
    //         FifthUpvoteModal: 'inActive',
    //         SixthUpvoteModal: 'inActive',
    //         SeventhUpvoteModal: 'inActive',
    //         EighthUpvoteModal: 'inActive',
    //         SilverRankModal: 'inActive',
    //         GoldRankModal: 'inActive',
    //         DiamondRankModal: 'inActive',
    //     }

    //     Axios.patch('http://localhost:5000/api/userAwardModalsUpdate/:id' + activeUser, payload)
    //         .then((res) => {
    //             if (res) {
    //                 console.log("User Updated");
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    const navigate = useNavigate();
    useEffect(()=>{

        let verifyUser = {token: sessionStorage.getItem('token')};
        if(!verifyUser.token){
          navigate('/');
          sessionStorage.clear();
        }else{
          Axios.post('http://localhost:5000/api/verifytoken', verifyUser)
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

<>
{deleteModal}
        <div>
            


            <motion.div className='pp_main_card'
                initial={{ width: 0 }}
                animate={{ width: "76.8%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
            >

                {/* {modalQuestionOne} */}

                <Helmet>
                    <title>Profile</title>
                </Helmet>
                <div className='pp_welcome_con'>
                    <div className='pp_welcome_banner'>
                        <h1>Hi {username},</h1>
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
                        }} variant="contained" href="#questions">View Questions</Button>
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
                            <ThemeProvider theme={theme}>
                                <CircularProgress color="progress" variant="determinate" size={120} value={reliability} />
                            </ThemeProvider>
                            <h1>{reliability}</h1>
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



                {/* {adminButtonCheck === true ?  : ''} */}

                <Button sx={{
                    display: adminButtonCheck,
                    backgroundColor: '#2b2b2b',
                    float: 'left',
                    borderRadius: '20px',
                    height: '45px',
                    marginTop: "0px",
                    textTransform: 'capitalize',
                    marginLeft: "50px",
                    width: '200px',
                    marginBottom: '-70px',
                    fontFamily: 'Open Sans',
                    '&:hover': {
                        backgroundColor: '#2b2b2b',
                    }
                }} variant="contained" onClick={requestAdmin}>Admin Request</Button>

                <Button sx={{
                    backgroundColor: '#2b2b2b',
                    float: 'right',
                    borderRadius: '20px',
                    height: '45px',
                    marginTop: "0px",
                    textTransform: 'capitalize',
                    marginRight: "50px",
                    width: '200px',
                    marginBottom: '-70px',
                    fontFamily: 'Open Sans',
                    '&:hover': {
                        backgroundColor: '#2b2b2b',
                    }
                }} variant="contained" onClick={deleteItem}>Delete my Account</Button>
            </motion.div>
        </div>
        </>
    );
};

export default ProfilePage;