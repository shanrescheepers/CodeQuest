import "../css/QuestionCard.css";
import "../css/profilePage.css";
import "../css/IndividualQuestion.css";
import "../css/AnswerCard.css";
import profilePic from "../assets/homeAssets/profile-pic.png";
import { Link } from "react-router-dom";
import UpVote from "../assets/questionCardAssets/upvote.png";
import DownVote from "../assets/questionCardAssets/downvote.png";
import deleteIcon from "../assets/questionCardAssets/delete.png";
import $ from "jquery";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router";
import flag from "../assets/individualPageAssets/questionFlag.png";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import { Flag } from "@mui/icons-material";
import FlagModal from '../modals/FlagModal';
import Highlight from 'react-highlight';
import "../css/code.css";



export const AnswerCard = (props) => {
    console.log("Answer Prop", props);
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    function AnswerQuestion() {
        // console.log("something");
        $(".answer_question").fadeIn();
    }
    //navigate to individual question page
    const goToIndividualQuestion = () => {
        navigate("/IndividualQuestion");

        //send question id to session storage
        sessionStorage.setItem("questionId", props.questionId);
    };

    //=====================================================================
    //Get Current Vote state

    const [arrowImgUp, setArrowImgUp] = useState('Up');
    const [arrowImgDown, setArrowImgDown] = useState('Down');
    const [category, setCategory] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/readanswervote')
            .then(res => {
                let data = res.data;
                // console.log(data);
                let user = sessionStorage.getItem('id');

                for (let i = 0; i < data.length; i++) {
                    if (props.answerId === data[i].answerId) {

                        // console.log(user, data[i].userId);
                        if (user === data[i].userId) {
                            console.log("should work");
                            if (data[i].vote === 'upvote') {
                                setArrowImgUp('UpActive');


                                setArrowImgDown('Down')
                                setCategory('startUp')
                            } else if (data[i].vote === 'downvote') {
                                setArrowImgDown('DownActive')
                                setArrowImgUp('Up');
                                setCategory('startDown')
                            };
                            console.log("not happening");

                        } else {
                            console.log('N/A');
                        }


                    } else {
                        // console.log('not relevent');
                    }

                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);




    //=====================================================================
    //Upvote and downvote

    let upVotes = props.upvotes;
    let downVotes = props.downvotes;

    const [voteCast, setVoteCast] = useState('');
    const [upVoteCast, setUpvoteCast] = useState(props.upvotes);
    const [downVoteCast, setDownvoteCast] = useState(props.downvotes);


    const handleVote = (event, vote) => {
        setVoteCast(vote);

        if (category === 'startUp' && arrowImgUp === 'UpActive' && arrowImgDown === 'Down') {
            console.log("Up vote again");
            if (vote === null) {
                console.log("Did do null");
                setUpvoteCast(props.upvotes - 1);
                setDownvoteCast(props.downvotes);
                setArrowImgUp('Up');
                setArrowImgDown('Down');
            } else if (vote === 'down') {
                setDownvoteCast(props.downvotes + 1);
                setUpvoteCast(props.upvotes - 1);
                setArrowImgUp('Up');
                setArrowImgDown('DownActive');
            } else if (vote === 'up') {
                console.log("Did do null");
                setUpvoteCast(props.upvotes - 1);
                setDownvoteCast(props.downvotes);
                setArrowImgUp('Up');
                setArrowImgDown('Down');
            }
        };
        if (category === 'startUp' && arrowImgUp === 'Up' && arrowImgDown === 'Down') {
            if (vote === 'up') {
                setUpvoteCast(props.upvotes);
                setDownvoteCast(props.downvotes);
                setArrowImgUp('UpActive');
                setArrowImgDown('Down');
            } else if (vote === 'down') {
                setDownvoteCast(props.downvotes + 1);
                setUpvoteCast(props.upvotes - 1);
                setArrowImgUp('Up');
                setArrowImgDown('DownActive');
            }
        };
        if (category === 'startUp' && arrowImgUp === 'Up' && arrowImgDown === 'DownActive') {
            if (vote === 'up') {
                console.log("Unvote");
                setUpvoteCast(props.upvotes);
                setDownvoteCast(props.downvotes);
                setArrowImgUp('UpActive');
                setArrowImgDown('Down');
            } else if (vote === null) {
                console.log("Unvote");
                setDownvoteCast(props.downvotes);
                setUpvoteCast(props.upvotes - 1);
                setArrowImgUp('Up');
                setArrowImgDown('Down');
            }
        };

        //start down

        if (category === 'startDown' && arrowImgUp === 'Up' && arrowImgDown === 'Down') {
            if (vote === 'up') {
                setUpvoteCast(props.upvotes + 1);
                setDownvoteCast(props.downvotes - 1);
                setArrowImgUp('UpActive');
                setArrowImgDown('Down');
            } else if (vote === 'down') {
                setDownvoteCast(props.downvotes);
                setUpvoteCast(props.upvotes);
                setArrowImgUp('Up');
                setArrowImgDown('DownActive');
            }
        };

        if (category === 'startDown' && arrowImgUp === 'UpActive' && arrowImgDown === 'Down') {
            if (vote === null) {
                setUpvoteCast(props.upvotes - 1);
                setDownvoteCast(props.downvotes - 1);
                setArrowImgUp('Up');
                setArrowImgDown('Down');
                console.log('active to nuet');
            } else if (vote === 'down') {
                setDownvoteCast(props.downvotes);
                setUpvoteCast(props.upvotes);
                setArrowImgUp('Up');
                setArrowImgDown('DownActive');
            }
        };

        //start down

        if (category === 'startDown' && arrowImgUp === 'Up' && arrowImgDown === 'DownActive') {
            if (vote === 'up') {
                setUpvoteCast(props.upvotes + 1);
                setDownvoteCast(props.downvotes - 1);
                setArrowImgUp('UpActive');
                setArrowImgDown('Down');
            } else if (vote === null) {
                setDownvoteCast(props.downvotes - 1);
                setUpvoteCast(props.upvotes);
                setArrowImgUp('Up');
                setArrowImgDown('Down');
            } else if (vote === 'down') {
                setDownvoteCast(props.downvotes - 1);
                setUpvoteCast(props.upvotes);
                setArrowImgUp('Up');
                setArrowImgDown('Down');
            }
        };

        if (category === 'startDown' && arrowImgUp === 'Up' && arrowImgDown === 'Down') {
            if (vote === 'up') {
                setUpvoteCast(props.upvotes + 1);
                setDownvoteCast(props.downvotes - 1);
                setArrowImgUp('UpActive');
                setArrowImgDown('Down');
            } else if (vote === 'down') {
                setDownvoteCast(props.downvotes);
                setUpvoteCast(props.upvotes);
                setArrowImgUp('Up');
                setArrowImgDown('DownActive');
            }
        };

        if (category === 'startDown' && arrowImgUp === 'UpActive' && arrowImgDown === 'Down') {
            if (vote === null) {
                setUpvoteCast(props.upvotes - 1);
                setDownvoteCast(props.downvotes - 1);
                setArrowImgUp('Up');
                setArrowImgDown('Down');
                console.log('active to nuet');
            } else if (vote === 'down') {
                setDownvoteCast(props.downvotes);
                setUpvoteCast(props.upvotes);
                setArrowImgUp('Up');
                setArrowImgDown('DownActive');
            }
        };

        //start neutral

        if (category === '' && arrowImgUp === 'Up' && arrowImgDown === 'Down') {
            if (vote === 'up') {
                setUpvoteCast(props.upvotes + 1);
                setDownvoteCast(props.downvotes);
                setArrowImgUp('UpActive');
                setArrowImgDown('Down');
            } else if (vote === 'down') {
                setDownvoteCast(props.downvotes + 1);
                setUpvoteCast(props.upvotes);
                setArrowImgUp('Up');
                setArrowImgDown('DownActive');
            }
        };

        if (category === '' && arrowImgUp === 'UpActive' && arrowImgDown === 'Down') {
            console.log("Upvote should be 0");
            console.log("vote", vote);
            if (vote === null) {
                console.log("up again");
                setUpvoteCast(props.upvotes);
                setDownvoteCast(props.downvotes);
                setArrowImgUp('Up');
                setArrowImgDown('Down');
                console.log('active to nuet');
            } else if (vote === 'down') {
                setDownvoteCast(props.downvotes + 1);
                setUpvoteCast(props.upvotes);
                setArrowImgUp('Up');
                setArrowImgDown('DownActive');
            }
        };

        if (category === '' && arrowImgUp === 'Up' && arrowImgDown === 'DownActive') {
            if (vote === 'up') {
                setUpvoteCast(props.upvotes + 1);
                setDownvoteCast(props.downvotes);
                setArrowImgUp('UpActive');
                setArrowImgDown('Down');
            } else if (vote === null) {
                setDownvoteCast(props.downvotes);
                setUpvoteCast(props.upvotes);
                setArrowImgUp('Up');
                setArrowImgDown('Down');
            }
        };



    };
    //format votes

    let displayUpVote = upVoteCast;
    if (displayUpVote > 9) {
        displayUpVote = displayUpVote
    } else {
        displayUpVote = '0' + displayUpVote
    }

    let displayDownVote = downVoteCast;
    if (displayDownVote > 9) {
        displayDownVote = displayDownVote
    } else {
        displayDownVote = '0' + displayDownVote
    }


    //UpVote
    const addVote = () => {
        // console.log("It works, Whoopieee");

        const answerId = props.answerId;
        console.log(answerId);
        console.log(props.answerId);
        let payloadData = {
            vote: 'upvote',
            userId: sessionStorage.getItem('id'),
            answerId: answerId
        }

        axios.post('http://localhost:5000/api/addanswervote', payloadData)
            .then((res) => {
                if (res) {
                    // console.log("Vote Added"); 
                    console.log(payloadData);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    //======================================================================
    //downvote



    const subtractVote = () => {
        // console.log("It works, Whoopieee");

        // console.log(props.answerId);
        // console.log(props.questionId);

        const answerId = props.answerId;
        console.log(answerId);
        let payloadData = {
            vote: 'downvote',
            userId: sessionStorage.getItem('id'),
            answerId: answerId
        }
        console.log(payloadData);

        axios.post('http://localhost:5000/api/addanswervote', payloadData)
            .then((res) => {
                if (res) {
                    console.log("Vote Added");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //===================================================================
    //Format Date date
    let date = props.date;
    let formatDate = moment(date).format('DD MMMM YYYY');


    //====================================================================
    //Cut descirption
    let desc = (props.description).substring(0, 80);
    //=====================================================================
    //User Info

    const [username, setUsername] = useState();
    const [rank, setRank] = useState();
    const [profileImg, setprofileImg] = useState();
    const [year, setYear] = useState();
    const [questionColor, setQuestionColor] = useState();
    const [answerConfirmation, setAnsweronfirmation] = useState();

    //display screenshots in image slider 
    let aScreenshots = props.screenshots;

    let screenshots = [];

    for (let i = 0; i < aScreenshots.length; i++) {
        let URLs = 'http://localhost:5000/answerScreenshots/' + aScreenshots[i].filename;
        screenshots.push(URLs);
    }


    useEffect(() => {
        console.log(props);

        if (props.userId == null) {
            //   console.log("User not logged in");
        } else {
            //   console.log("user logged in");
            axios
                .get("http://localhost:5000/api/userInfo/" + props.userId)
                .then((res) => {
                    let data = res.data;
                    if(data === null){
                        setUsername('Deleted User');
                    }else{
                        setUsername(data.username);
                        setRank(data.rank);
                        setprofileImg(data.profileimage);
                        setYear(data.yearlevel);
                    }

                    //   console.log(data.rank);

                    let year = data.yearlevel;
                    let bgColor = '';

                    if (year === 1) {
                        bgColor = "#6EEB83";
                    } else if (year === 2) {
                        bgColor = "#6CD4FF";
                    } else {
                        bgColor = "#FF7900";
                    }

                    setQuestionColor(bgColor)
                });
        }
    }, []);

    //get profile image path
    const imgURL = "Avatars/" + profileImg + ".png";
    const upImgURL = ('Votes/' + arrowImgUp + '.png');
    const downImgURL = ('Votes/' + arrowImgDown + '.png');

    // Answer Flag States
    const [flagModal, setFlagModal] = useState()
    const [flagState, setFlagState] = useState(false)
    const flagAnswer = () => {

        setFlagModal(<FlagModal close={setFlagModal} id={props.id} questionId={props.answerId} userId={props.userId} />)
    }
    useEffect(() => {
        axios.get('http://localhost:5000/api/reportedPost/' + props.answerId)
            .then(res => {
                let data = res.data;
                console.log(data);
                setFlagState(data)

            })
            .catch(function (error) {
                console.log(error);
            });

    }, [flagModal]);


const [showCode, setShowCode] = useState('');
let code= props.code;
useEffect(() => {
if(props.code === undefined){
    setShowCode('');
}else if(props.code != undefined){
    setShowCode(
    <Highlight autodetect className="code-converted-text">
    {code}
</Highlight>
)
}
}, [flagModal]);

    return (
        <>{flagModal}
            <div className="show_answered_con" style={{ backgroundColor: questionColor }}>
                <div className="show_answered_blue_con">

                    <div className="show_answer_text">
                        <h4>Answered by {username}</h4>
                        <p>{formatDate}</p>
                    </div>

                    <div className="show_answer_text">
                        <p>{props.description}</p>
                    </div>

                    <div className="slideshow">
                        <div className="slideshow-slider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                            {screenshots.map((screenshot, index) => (
                                <div className="slide" key={index}>
                                    <img src={screenshot} className="slide-img" />
                                </div>
                            ))}
                        </div>

                        <div className="slideshow-dots">
                            {screenshots.map((_, idx) => (
                                <div key={idx} className={`slideshow-dot${index === idx ? " active" : ""}`}
                                    onClick={() => {
                                        setIndex(idx);
                                    }}>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="code_text">
                        {/* <Highlight autodetect className="code-converted-text">
                            {props.code}
                        </Highlight> */}
                        {showCode}
                    </div>

                    <div className='divider'></div>

                    <div className='bottom-block'>
                        <div className='arrow-con'>
                            <ToggleButtonGroup
                                value={voteCast}
                                onChange={handleVote}
                                color="primary"
                                exclusive
                                sx={{ display: 'flex', alignItems: 'center' }}>
                                <ToggleButton onClick={addVote} value="up">
                                    <img className='upvote question-card-icon' src={upImgURL} />
                                </ToggleButton>

                                <small className='upvote-count vote-count'>{displayUpVote}</small>

                                <ToggleButton onClick={subtractVote} value="down">
                                    <img className='downvote question-card-icon' src={downImgURL} />
                                </ToggleButton>

                                <small className='downvote-count vote-count'>{displayDownVote}</small>
                            </ToggleButtonGroup>

                            {/* <img className='flag question-card-icon' onClick={addVote} src={flag} /> */}

                            {/* <div className='flag-button question-card-icon' onClick={() => flagAnswer()}>
                                <OutlinedFlagIcon fontSize="large" />
                            </div> */}
                            

                            {flagState ? (
                                <div className='answer-flag-button-red question-card-icon' onClick={() => console.log("Already flagged")}>
                                    <OutlinedFlagIcon fontSize="large" />
                                </div>
                            ) : (
                                <div className='flag-button question-card-icon' onClick={() => flagAnswer()}>
                                    <OutlinedFlagIcon fontSize="large" />
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

