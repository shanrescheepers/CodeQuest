import * as React from 'react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import '../scss/adminPage.scss';
import bosscatimage from '../assets/Admin.png';
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
import PromotionRequestsTableView from '../components/AdminComponents/PromotionRequests';
import QuestionCard from '../components/QuestionCard';
import { motion } from "framer-motion";
import Axios from 'axios';
import Helmet from "react-helmet";

import NewReportedUserTable from '../components/AdminComponents/NewReportedUsersTable';
import NewAllUsersTable from '../components/AdminComponents/NewAllUsersTable';
import FlaggedAnswers from '../components/AdminComponents/FlaggedAnswers';



const AdminPage = (props) => {
    props.funcNav(true);
    

    // Links function
    const [value, setValue] = React.useState('1');
    const [valueTwo, setValueTwo] = React.useState('1');

    const activeUser = sessionStorage.getItem("id");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeTwo = (event, newValueTwo) => {
        setValueTwo(newValueTwo);
    };
    const [totalUsers, setTotalUsers] = useState();
    // represents all users
    const [allTotalUsers, setAllTotalUsers] = useState();
    // renders of users
    const [totalRenderedUsers, setTotalRenderedUsers] = useState(false);

    // Reported Users
    const [reportedUsers, setReportedUsers] = useState();
    const [reportedUsersStateNumberofUsers, setReportedUsersStateNumberofUsers] = useState();

    const [totalReportedUsers, setTotalReportedUsers] = useState();

    useEffect(() => {
        Axios.get('http://localhost:5000/api/getUser')
            .then(res => {
                // getting all the isers in. then count them, with it, capture some data , the ids, the names, emails.
                setTotalUsers(res.data.length)
                // console.log(res.data.length)

                const allUsers = res.data.map((item) => <UserprofileCard key={item.id} username={item.username} email={item.email} profileimage={item.profileimage} yearlevel={item.yearlevel} />)

                setAllTotalUsers(allUsers);
            });

        Axios.get('http://localhost:5000/api/allReportedUsers')
            .then(res => {
                // getting all the isers in. then count them, with it, capture some data , the ids, the names, emails.
                setTotalReportedUsers(res.data.length)

                let reportedUserIds = [];
                // Check om te sien of daar nie dubbels is van dieselfde user nie. daar kan net een user wees.
                for (let index = 0; index < res.data.length; index++) {
                    // console.log(res.data[index])
                    if (!reportedUserIds.includes(res.data[index].reportedUserId)) {
                        reportedUserIds.push(res.data[index].reportedUserId);
                    };
                };

                // al die users wat reported is
                let allReportedUsers = new Array()
                for (let i = 0; i < reportedUserIds.length; i++) {
                    Axios.get('http://localhost:5000/api/userInfo/' + reportedUserIds[i]).then(res => {
                        allReportedUsers.push(res.data);
                        let reportedUsersofCQ = allReportedUsers.map((reporteds) => <ReportedUserCard key={reporteds._id} username={reporteds.username} email={reporteds.email} />)
                        // Check IF - dubbels in die nuwe array of nie? 
                        setReportedUsers(reportedUsersofCQ);
                        setReportedUsersStateNumberofUsers(reportedUsersofCQ.length);


                    });
                    // console.log(reportedUsersState.length);
                    setTotalRenderedUsers(false)

                }
            });

    }, [totalRenderedUsers]);



    // const AdminPermission = () => {
    //     let payload = {
    //         requestStatus: "true"
    //     }

    //     Axios.patch('/api/adminreqauth/:id' + activeUser, payload)
    //         .then((res) => {
    //             if (res) {
    //                 console.log("User Updated");
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

//verify User

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
        <motion.div className='admin'
            initial={{ width: 0 }}
            animate={{ width: "76.8%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        >
            <Helmet>
                <title>Admin</title>
            </Helmet>

            <div className='admin__top__header'>
                <div className='admin__top__header__heyboss'>
                    <h1 className='admin__top__header__heyboss__h1'>Hey Boss,</h1>
                    <p className='admin__top__header__heyboss__p'>We wanted to make your life easier - so everything you need to see has been displayed below! Maybe now is a good time to look at any flagged questions?  </p>
                    <Button sx={{
                        backgroundColor: '#FF7900', borderRadius: '20px', marginTop: "20px", width: '140px', fontFamily: 'Open Sans', textTransform: 'capitalize',
                        '&:hover': {
                            backgroundColor: '#FF7900',
                        }
                    }} variant="contained" href='#flaggedBTN'>View Flagged</Button>
                </div>
                <div className='admin__top__header__cat'>
                    <img src={bosscatimage} alt="bosscatimage" className='admin__top__header__heyboss__maincatimage' style={{ height: "270px", paddingTop: "35px" }} />
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
                    <TabPanel value="1" className='admin__links__card'>

                        {/* // style={{ gridTemplateColumns: `repeat(${totalUsers}, calc(7%))` }} >
                        // {allTotalUsers} */}
                        <NewAllUsersTable />
                    </TabPanel>

                    {/* <TabPanel value="2" className='admin__links__card' style={{ gridTemplateColumns: `repeat(${reportedUsersStateNumberofUsers}, calc(20%))` }} >
                        {reportedUsers}
                    </TabPanel> */}

                    {/* Reported user Table */}
                    <TabPanel value="2" className='admin__links__card' >
                        <NewReportedUserTable />
                    </TabPanel>


                    {/* Reported user Table */}

                    <TabPanel value="3" className='admin__links__card'><PromotionRequestsTableView /></TabPanel>

                </TabContext>


            </div>

            <div className='admin__flagged__and__bad' id="flaggedBTN">
                <TabContext value={valueTwo} className='admin__flagged__and__bad__tabs'>
                    <div className='admin__flagged__and__bad__tabs__tablinks'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                            <TabList onChange={handleChangeTwo} aria-label="lab API tabs example" >
                                <Tab label="Flagged Posts" value="1" indicatorColor="secondary" />
                                <Tab label="Flagged Answers" value="2" />
                            </TabList>

                        </Box>
                    </div>
                    <div className='admin__flagged__and__bad__tabs__tabpanel'>
                        <TabPanel value="1" >
                            <FlaggedPosts />
                        </TabPanel>
                        <TabPanel value="2">
                            <FlaggedAnswers />
                        </TabPanel>
                    </div>
                </TabContext>
            </div>
        </motion.div>
    );
};

export default AdminPage;