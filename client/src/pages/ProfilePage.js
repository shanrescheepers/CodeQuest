import React from 'react';
import Navigation from '../components/Navigation';
import '../CSS/profilePage.css';
import Button from '@mui/material/Button';

import fishUnlockImage from '../Assets/profilePageAssets/fishUnlock.png';
import fishLockImage from '../Assets/profilePageAssets/fishLock.png';
import yarn from '../Assets/profilePageAssets/yarn.png';
import wizard from '../Assets/profilePageAssets/wizard.png';
import star from '../Assets/profilePageAssets/star.png';
import profilePicture from '../Assets/placeholderPP.png';
import Delete from '../Assets/profilePageAssets/delete.png';
import UpVote from '../Assets/profilePageAssets/upVote.png';
import DownVote from '../Assets/profilePageAssets/downVote.png';

const ProfilePage = () => {
    return (
        <div>
            {/* <Navigation/> */}

            <div className='pp_main_card'>

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
                                <img src={fishUnlockImage} className='pp_rank_img'></img>
                                <p>Bronze</p>
                            </div>

                            <div className='pp_rank'>
                                <img src={fishLockImage} className='pp_rank_img'></img>
                                <p>Silver</p>
                            </div>

                            <div className='pp_rank'>
                                <img src={fishLockImage} className='pp_rank_img'></img>
                                <p>Gold</p>
                            </div>

                            <div className='pp_rank'>
                                <img src={fishLockImage} className='pp_rank_img'></img>
                                <p>Platinum</p>
                            </div>

                            <div className='pp_rank'>
                                <img src={fishLockImage} className='pp_rank_img'></img>
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
                            <img src={yarn}></img>
                            <p className='pp_badge_heading'>Bronze Ball of Yarn</p>
                            <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
                        </div>

                        <div className='pp_badge_card'>
                            <img src={star}></img>
                            <p className='pp_badge_heading'>Gold Star</p>
                            <p className='pp_badge_desc'>What a champ! You've answered 10 questions!</p>
                        </div>

                        <div className='pp_badge_card'>
                            <img src={wizard}></img>
                            <p className='pp_badge_heading'>A Hat for Our Wiz</p>
                            <p className='pp_badge_desc'>Congratulations! You've answered 10 questions!</p>
                        </div>

                        <div className='pp_badge_card'>
                            <img src={yarn}></img>
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
                            <img src={profilePicture} className='pp_profile_picture'></img>
                            <p className='pp_username'>Username</p>
                            <p className='pp_date'>00 September 2022</p>
                            <img src={Delete} className='pp_delete'></img>
                            <div className='pp_question_con'>
                                <p>Q: Question One?</p>
                            </div>

                            <img src={UpVote} className='pp_up_Vote_img'></img>
                            <p className='pp_up_Votes_text'>00</p>
                            <img src={DownVote} className='pp_down_Vote_img'></img>
                            <p className='pp_down_Votes_text'>00</p>

                            <p className='answers'>00 Answers</p>
                        </div>

                        <div className='pp_UserInput_card'>
                            <img src={profilePicture} className='pp_profile_picture'></img>
                            <p className='pp_username'>Username</p>
                            <p className='pp_date'>00 September 2022</p>
                            <img src={Delete} className='pp_delete'></img>
                            <div className='pp_question_con'>
                                <p>Q: Question Two?</p>
                            </div>

                            <img src={UpVote} className='pp_up_Vote_img'></img>
                            <p className='pp_up_Votes_text'>00</p>
                            <img src={DownVote} className='pp_down_Vote_img'></img>
                            <p className='pp_down_Votes_text'>00</p>

                            <p className='answers'>00 Answers</p>
                        </div>

                        <div className='pp_UserInput_card'>
                            <img src={profilePicture} className='pp_profile_picture'></img>
                            <p className='pp_username'>Username</p>
                            <p className='pp_date'>00 September 2022</p>
                            <img src={Delete} className='pp_delete'></img>
                            <div className='pp_question_con'>
                                <p>Q: Question Three?</p>
                            </div>

                            <img src={UpVote} className='pp_up_Vote_img'></img>
                            <p className='pp_up_Votes_text'>00</p>
                            <img src={DownVote} className='pp_down_Vote_img'></img>
                            <p className='pp_down_Votes_text'>00</p>

                            <p className='answers'>00 Answers</p>
                        </div>

                        <div className='pp_UserInput_card'>
                            <img src={profilePicture} className='pp_profile_picture'></img>
                            <p className='pp_username'>Username</p>
                            <p className='pp_date'>00 September 2022</p>
                            <img src={Delete} className='pp_delete'></img>
                            <div className='pp_question_con'>
                                <p>Q: Question Four?</p>
                            </div>

                            <img src={UpVote} className='pp_up_Vote_img'></img>
                            <p className='pp_up_Votes_text'>00</p>
                            <img src={DownVote} className='pp_down_Vote_img'></img>
                            <p className='pp_down_Votes_text'>00</p>

                            <p className='answers'>00 Answers</p>
                        </div>

                        <div className='pp_UserInput_card'>
                            <img src={profilePicture} className='pp_profile_picture'></img>
                            <p className='pp_username'>Username</p>
                            <p className='pp_date'>00 September 2022</p>
                            <img src={Delete} className='pp_delete'></img>
                            <div className='pp_question_con'>
                                <p>Q: Question Five?</p>
                            </div>

                            <img src={UpVote} className='pp_up_Vote_img'></img>
                            <p className='pp_up_Votes_text'>00</p>
                            <img src={DownVote} className='pp_down_Vote_img'></img>
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

            </div>

        </div>
    );
};

export default ProfilePage;