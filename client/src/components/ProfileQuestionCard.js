import '../css/QuestionCard.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import DeleteModal from '../modals/DeleteModal';

const ProfileQuestionCard = (props) => {

    const navigate = useNavigate();

    //navigate to individual question page
    const goToIndividualQuestion = () => {
        navigate('/IndividualQuestion');

        //send question id to session storage
        sessionStorage.setItem('questionId', props.questionId);
    }

    const [answersLength, setAnswersLength] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:5000/api/readQuestionAnswerAmount/' + props?.questionId)
            .then(res => {
                let data = res.data;
                console.log(data);
                setAnswersLength(data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    //=====================================================================
    //Get Current Vote state

    const [arrowImgUp, setArrowImgUp] = useState('Up');
    const [arrowImgDown, setArrowImgDown] = useState('Down');
    const [category, setCategory] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/readvote')
            .then(res => {
                let data = res.data;
                //  console.log(data);
                let user = sessionStorage.getItem('id');

                for (let i = 0; i < data.length; i++) {
                    if (props.questionId === data[i].questionId) {

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
                            //    console.log('N/A');
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
        // console.log(vote);
        // console.log("category", category);
        // console.log("arrowImgUp",arrowImgUp);
        // console.log("arrowImgDown",arrowImgDown);

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

        let payloadData = {
            vote: 'upvote',
            userId: sessionStorage.getItem('id'),
            questionId: props.questionId
        }

        axios.post('http://localhost:5000/api/addvote', payloadData)
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

        let payloadData = {
            vote: 'downvote',
            userId: sessionStorage.getItem('id'),
            questionId: props.questionId
        }
        // console.log(payloadData);

        axios.post('http://localhost:5000/api/addvote', payloadData)
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

    useEffect(() => {

        if (props.userId == null) {
            console.log("User not logged in")

        } else {
            console.log("user logged in")
            axios.get('http://localhost:5000/api/userInfo/' + props.userId)
                .then(res => {
                    let data = res.data;
                    setUsername(data.username);
                    setRank(data.rank);
                    setprofileImg(data.profileimage);
                    setYear(data.yearlevel);
                    // console.log(data.rank)
                })
        }
        // localStorage.clear();
    }, []);

    //get profile image path
    const imgURL = ('Avatars/' + profileImg + '.png');

    // console.log(year);
    let bgColor = '';

    if (year === 1) {
        bgColor = '#6EEB83'
    } else if (year === 2) {
        bgColor = '#6CD4FF'
    } else {
        bgColor = '#FF7900'
    };


    const upImgURL = ('Votes/' + arrowImgUp + '.png');
    const downImgURL = ('Votes/' + arrowImgDown + '.png');



    const [deleteQuestionModal, setDeleteQuestionModal] = useState();

    const deleteQuestion = () => {
        // console.log("Delete Question");

        setDeleteQuestionModal(<DeleteModal
            close={setDeleteQuestionModal}
            questionId={props.questionId}
        />)

    }


    return (
        <>
         
            <div className='question-con' >
       
    
                <div className='question-con-content'>
                    <div className='top-block'>
                        <div className='user-info-block' onClick={() => goToIndividualQuestion()}>
                            <div className='profile-circle question' style={{ backgroundColor: bgColor }}><img src={imgURL} className="profile-Img question"></img></div>
                            <div className='user-info'>
                                <h4>{username}</h4>
                                <p>{formatDate}</p>
                            </div>
                        </div>

                        {/* FLAG COLOR HERE in div class: flag-button-red */}

                        <div className='flag-button question-card-icon' onClick={deleteQuestion}>
                            <DeleteOutlineOutlinedIcon fontSize="large" />
                        </div>





                    </div>

                    <div className='user-question' onClick={() => goToIndividualQuestion()}>
                        <h3>Q: {props.title}</h3>
                        <p>{desc} ...</p>
                    </div>

                    <div className='divider' onClick={() => goToIndividualQuestion()}></div>

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
                        </div>

                        <small><p>{answersLength} Answers</p></small>
                    </div>
                    {deleteQuestionModal}
                </div>
            </div>
        </>
    );
}

export default ProfileQuestionCard;