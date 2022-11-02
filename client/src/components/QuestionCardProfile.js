import '../css/QuestionCard.css';
import { Link } from 'react-router-dom';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router';
import FlagModal from '../modals/FlagModal';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Flag } from '@mui/icons-material';

import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../modals/DeleteModal';


const QuestionCardProfile = (props) => {

    const navigate = useNavigate();

    const questionId = sessionStorage.setItem('questionId', props.questionId);

    //navigate to individual question page
    const goToIndividualQuestion = () => {
        navigate('/IndividualQuestion');

        //send question id to session storage
        sessionStorage.setItem('questionId', props.questionId);
    }
    const [flagModal, setFlagModal] = useState()


    const flagQuestion = () => {
        setFlagModal(<FlagModal close={setFlagModal} id={props.id} questionId={props.questionId} userId={props.userId} />)
    }

    const [flagState, setFlagState] = useState(false)
    const userId = sessionStorage.getItem("id");
    useEffect(() => {
        axios.get('http://localhost:5000/api/reportedPost/' + props?.questionId + "/" + userId)
            .then(res => {
                let data = res.data;
                console.log(data);
                setFlagState(data)

            })
            .catch(function (error) {
                console.log(error);
            });

    }, [flagModal]);

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

    }, [flagModal]);

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

    const [deleteModal, setDeleteModal] = useState()

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


                    <DeleteModal
                        questionId={data._id}
                    />
                    setDeleteModal(deleteModal);
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



    return (
        <>{flagModal}
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

                        {deleteModal}

                        <div className='deleteQuestion' onClick={props.delete}>
                            <DeleteIcon style={{ height: "25px", width: "55px" }} />
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
                                color="primary"
                                exclusive
                                sx={{ display: 'flex', alignItems: 'center' }}>
                                <ToggleButton value="up" style={{ backgroundColor: 'transparent' }}>
                                    <img className='upvote question-card-icon' src={upImgURL} />
                                </ToggleButton>

                                <small className='upvote-count vote-count'>{displayUpVote}</small>

                                <ToggleButton value="down" style={{ backgroundColor: 'transparent' }}>
                                    <img className='downvote question-card-icon' src={downImgURL} />
                                </ToggleButton>

                                <small className='downvote-count vote-count'>{displayDownVote}</small>
                            </ToggleButtonGroup>
                        </div>

                        <small><p>{answersLength} Answers</p></small>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuestionCardProfile;