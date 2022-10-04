import * as React from 'react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import '../scss/adminPage.scss';
import bosscatimage from '../assets/adminpage_cat.svg';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import FlaggedPosts from '../components/AdminComponents/FlaggedPosts';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserprofileCard from '../components/AdminComponents/UserProfileCard';
import { deepOrange } from '@mui/material/colors';
import ReportedUserCard from '../components/AdminComponents/ReportedUsers';
import PromotionRequests from '../components/AdminComponents/PromotionRequests';
import QuestionCard from '../components/QuestionCard';
import { motion } from "framer-motion";
import Axios from 'axios';
import Helmet from "react-helmet";

const AdminPage = () => {
    // Links function
    const [value, setValue] = React.useState('1');
    const [valueTwo, setValueTwo] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeTwo = (event, newValueTwo) => {
        setValueTwo(newValueTwo);
    };
    // // const [loggedIn, setLoggedIn] = useState(true);
    // let navigate = useNavigate();

    // const getAdminPermission = (rankId) => {
    //     if (rankId === 'Diamond') {
    //         console.log("navigate true because rank is Diamond, Admint Rights Granted")
    //         return true;
    //     } else {
    //         navigate("/FeedPage", { replace: true });
    //         localStorage.clear();
    //         console.log("navigate false because rank admin permission is not 1")
    //         return false;
    //     }
    // }

    const [totalUsers, setTotalUsers] = useState();
    // represents all users
    const [allTotalUsers, setAllTotalUsers] = useState();
    // renders of users
    const [totalRenderedUsers, setTotalRenderedUsers] = useState(false);


    // // Admin Rights Permission
    useEffect(() => {
        Axios.get('http://localhost:5000/api/getUser')
            .then(res => {
                // getting all the isers in. then count them, with it, capture some data , the ids, the names, emails.
                setTotalUsers(res.data.length)
                // console.log(res.data.length)

                const allUsers = res.data.map((item) => <UserprofileCard key={item.id} username={item.username} email={item.email} profileimage={item.profileimage} yearlevel={item.yearlevel} />)

                setAllTotalUsers(allUsers);
                setTotalRenderedUsers(false);
            })
    }, [totalRenderedUsers]);



    return (
        <motion.div className='admin'
            intital={{ width: 0 }}
            animate={{ width: "76%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        >
            <Helmet>
                <title>Admin</title>
            </Helmet>

            <div className='admin__top__header'>
                <div className='admin__top__header__heyboss'>
                    <h1 className='admin__top__header__heyboss__h1'>Hey Boss,</h1>
                    <p className='admin__top__header__heyboss__p'>Everything you need to see has been displayed below. </p>
                    <Button sx={{
                        backgroundColor: '#FF7900', borderRadius: '20px', marginTop: "20px", width: '140px', fontFamily: 'Open Sans', textTransform: 'capitalize',
                        '&:hover': {
                            backgroundColor: '#FF7900',
                        }
                    }} variant="contained">Button</Button>
                </div>
                <div className='admin__top__header__cat'>
                    <img src={bosscatimage} alt="bosscatimage" className='admin__top__header__heyboss__maincatimage' style={{ height: "250px", paddingTop: "40px" }} />
                </div>
            </div>


            <div className='admin__con'  >
                <TabContext value={value} className='admin__links'>
                    <div className='admin__links__tablinks'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" >
                                <Tab label="All Users" value="1" indicatorColor="secondary" />
                                <Tab label="Reported Users" value="2" />
                                <Tab label="Promotion Requests" value="3" />
                            </TabList>
                        </Box>
                    </div>

                    {/* All Users */}
                    <TabPanel value="1" className='admin__links__card'
                        // grid-template-columns: repeat(200, calc(17% - 100px)) !important;
                        style={{ gridTemplateColumns: `repeat(${totalUsers}, calc(20%))` }} >
                        {allTotalUsers}
                    </TabPanel>

                    <TabPanel value="2" className='admin__links__card'><ReportedUserCard /></TabPanel>
                    <TabPanel value="3" className='admin__links__card'><PromotionRequests /></TabPanel>

                </TabContext>


            </div>

            <div className='admin__flagged__and__bad'>
                <TabContext value={valueTwo} className='admin__flagged__and__bad__tabs'>
                    <div className='admin__flagged__and__bad__tabs__tablinks'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                            <TabList onChange={handleChangeTwo} aria-label="lab API tabs example" >
                                <Tab label="Flagged Posts" value="1" indicatorColor="secondary" />
                                <Tab label="Flagged Answers" value="2" />
                                <Tab label="Badly Rated Posts" value="3" />
                                <Tab label="Badly Rated Answers" value="4" />
                            </TabList>
                        </Box>
                    </div>
                    <div className='admin__flagged__and__bad__tabs__tabpanel'>
                        <TabPanel value="1" >
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                        </TabPanel>
                        <TabPanel value="2">
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                        </TabPanel>
                        <TabPanel value="3">
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                        </TabPanel>
                        <TabPanel value="4">
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                        </TabPanel>
                    </div>
                </TabContext>
            </div>
        </motion.div>
    );
};

export default AdminPage;