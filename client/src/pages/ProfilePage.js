import React from 'react';
import Navigation from '../components/Navigation';
import '../CSS/profilePage.css';
import Button from '@mui/material/Button';

import fishUnlockImage from '../assets/profilePageAssets/fishUnlock.png';
import fishLockImage from '../assets/profilePageAssets/fishLock.png';

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
                        <div className='pp_badge_card'></div>
                        <div className='pp_badge_card'></div>
                        <div className='pp_badge_card'></div>
                        <div className='pp_badge_card'></div>
                        <div className='pp_badge_card'></div>
                        <div className='pp_badge_card'></div>
                        <div className='pp_badge_card'></div>
                    </div>
                </div>


                <div className='pp_activity_con'>
                    <p>Questions</p>
                    <p>Answers</p>

                    <div className='pp_userInput_card_con'>
                        <div className='pp_UserInput_card'></div>
                    </div>
    

                </div>


            </div>

        </div>
    );
};

export default ProfilePage;