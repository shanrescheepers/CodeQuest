import React from 'react';
import '../css/profilePage.css';
import Button from '@mui/material/Button';

import fishUnlockImage from '../assets/profilePageAssets/fishUnlock.png';
import fishLockImage from '../assets/profilePageAssets/fishLock.png';
import yarn from '../assets/profilePageAssets/yarn.png';
import wizard from '../assets/profilePageAssets/wizard.png';
import star from '../assets/profilePageAssets/star.png';
import profilePicture from '../assets/placeholderPP.png';
import Delete from '../assets/profilePageAssets/delete.png';
import UpVote from '../assets/profilePageAssets/upVote.png';
import DownVote from '../assets/profilePageAssets/downVote.png';

import { motion } from "framer-motion";

const ProfilePage = () => {
    return (


        <motion.div className='pp_main_card'
            intital={{ width: 0 }}
            animate={{ width: "70%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>

            <div className='pp_welcome_con'>
                <div className='pp_welcome_banner'>
                    <h1>Hi Friend,</h1>
                    <p>We love that you've joined us! Lets take a look at all things YOU!</p>
                    <Button sx={{
                        backgroundColor: '#FF7900', borderRadius: '20px', marginTop: "20px", width: '140px', fontFamily: 'Open Sans',
                        '&:hover': {
                            backgroundColor: '#FF7900',
                        }
                    }} variant="contained">Button</Button>
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
                <p className='pp_questions_btn'>Questions</p>
                <p className='pp_answers_btn'>Answers</p>

                <div className='pp_userInput_card_con'>

                    <div className='pp_UserInput_card'>
                        <img src={profilePicture} alt="img" className='pp_profile_picture'></img>
                        <p className='pp_username'>Username</p>
                        <p className='pp_date'>00 September 2022</p>
                        <img src={Delete} alt="img" className='pp_delete'></img>
                        <div className='pp_question_con'>
                            <p>Q: Question One?</p>
                        </div>

                        <img src={UpVote} alt="img" className='pp_up_Vote_img'></img>
                        <p className='pp_up_Votes_text'>00</p>
                        <img src={DownVote} alt="img" className='pp_down_Vote_img'></img>
                        <p className='pp_down_Votes_text'>00</p>

                        <p className='answers'>00 Answers</p>
                    </div>

                    <div className='pp_UserInput_card'>
                        <img src={profilePicture} alt="img" className='pp_profile_picture'></img>
                        <p className='pp_username'>Username</p>
                        <p className='pp_date'>00 September 2022</p>
                        <img src={Delete} alt="img" className='pp_delete'></img>
                        <div className='pp_question_con'>
                            <p>Q: Question Two?</p>
                        </div>

                        <img src={UpVote} alt="img" className='pp_up_Vote_img'></img>
                        <p className='pp_up_Votes_text'>00</p>
                        <img src={DownVote} alt="img" className='pp_down_Vote_img'></img>
                        <p className='pp_down_Votes_text'>00</p>

                        <p className='answers'>00 Answers</p>
                    </div>

                    <div className='pp_UserInput_card'>
                        <img src={profilePicture} alt="img" className='pp_profile_picture'></img>
                        <p className='pp_username'>Username</p>
                        <p className='pp_date'>00 September 2022</p>
                        <img src={Delete} alt="img" className='pp_delete'></img>
                        <div className='pp_question_con'>
                            <p>Q: Question Three?</p>
                        </div>

                        <img src={UpVote} alt="img" className='pp_up_Vote_img'></img>
                        <p className='pp_up_Votes_text'>00</p>
                        <img src={DownVote} alt="img" className='pp_down_Vote_img'></img>
                        <p className='pp_down_Votes_text'>00</p>

                        <p className='answers'>00 Answers</p>
                    </div>

                    <div className='pp_UserInput_card'>
                        <img src={profilePicture} alt="img" className='pp_profile_picture'></img>
                        <p className='pp_username'>Username</p>
                        <p className='pp_date'>00 September 2022</p>
                        <img src={Delete} alt="img" className='pp_delete'></img>
                        <div className='pp_question_con'>
                            <p>Q: Question Four?</p>
                        </div>

                        <img src={UpVote} alt="img" className='pp_up_Vote_img'></img>
                        <p className='pp_up_Votes_text'>00</p>
                        <img src={DownVote} alt="img" className='pp_down_Vote_img'></img>
                        <p className='pp_down_Votes_text'>00</p>

                        <p className='answers'>00 Answers</p>
                    </div>

                    <div className='pp_UserInput_card'>
                        <img src={profilePicture} alt="img" className='pp_profile_picture'></img>
                        <p className='pp_username'>Username</p>
                        <p className='pp_date'>00 September 2022</p>
                        <img src={Delete} alt="img" className='pp_delete'></img>
                        <div className='pp_question_con'>
                            <p>Q: Question Five?</p>
                        </div>

                        <img src={UpVote} alt="img" className='pp_up_Vote_img'></img>
                        <p className='pp_up_Votes_text'>00</p>
                        <img src={DownVote} alt="img" className='pp_down_Vote_img'></img>
                        <p className='pp_down_Votes_text'>00</p>

                        <p className='answers'>00 Answers</p>
                    </div>


                </div>

            </div>

            <Button sx={{
                backgroundColor: '#2b2b2b', float: 'right', borderRadius: '20px', marginTop: "150px", marginRight: "50px", width: '200px', fontFamily: 'Open Sans',
                '&:hover': {
                    backgroundColor: '#2b2b2b',
                }
            }} variant="contained">Delete my Account</Button>

        </motion.div>
    );
};

export default ProfilePage;