import * as React from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import '../scss/adminPage.scss';
import bosscatimage from '../Assets/adminpage_cat.svg';
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

const AdminPage = () => {
    // Links function
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const [loggedIn, setLoggedIn] = useState(true);
    let navigate = useNavigate();

    const getAdminPermission = (rankId) => {
        if (rankId === '1') {
            console.log("navigate true because rank is 1")
            return true;
        } else {
            navigate("/FeedPage", { replace: true });
            localStorage.clear();
            console.log("navigate false because rank admin permission is not 1")
            return false;
        }
    }
    // This manner will be used in the navigation side as well. 
    // security options: 1) session storage || 2) axios call that will check user's permission. Everytime page reloads, it will check user permission, along with using session storage but just to GET the User's ID.
    // ID= rank, based on rank, pull permissions through
    useEffect(() => {
        { getAdminPermission("1") }
        // 2)here we'll give rank through based on axios call. 1)Session == bad, hackers etc
    })



    return (
        <div className='admin'>
            <div className='admin__top__header'>

                <div className='admin__top__header__heyboss'>
                    <h1 className='admin__top__header__heyboss__h1'>Hey Boss,</h1>
                    <p className='admin__top__header__heyboss__p'>Everything you need to see has been displayed below. </p>
                    <Button sx={{
                        backgroundColor: '#FF7900', borderRadius: '20px', marginTop: "20px", width: '140px', fontFamily: 'Open Sans',
                        '&:hover': {
                            backgroundColor: '#FF7900',
                        }
                    }} variant="contained">Button</Button>
                </div>

                <div className='admin__top__header__catimage'>
                    <img src={bosscatimage} alt="bosscatimage" className='admin__top__header__maincatimage' style={{ height: "250px", paddingTop: "40px" }} />
                </div>
            </div>
            <div className='admin__links users' >

                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                        <TabList onChange={handleChange} aria-label="lab API tabs example" >
                            <Tab label="Flagged Users" value="1" indicatorColor="secondary" />
                            <Tab label="Reported Users" value="2" />
                            <Tab label="Promotion Requests" value="3" />
                        </TabList>

                    </Box>
                    <TabPanel value="1"><UserprofileCard /></TabPanel>
                    <TabPanel value="2"><ReportedUserCard /></TabPanel>
                    <TabPanel value="3"><PromotionRequests /></TabPanel>

                </TabContext>


            </div>
            <div className='admin__flagged__and__bad posts'>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                        <TabList onChange={handleChange} aria-label="lab API tabs example" >
                            <Tab label="Flagged Posts" value="4" indicatorColor="secondary" />
                            <Tab label="Flagged Answers" value="5" />
                            <Tab label="Badly Rated Posts" value="6" />
                            <Tab label="Badly Rated Answers" value="7" />
                        </TabList>
                    </Box>
                    <TabPanel value="4"><QuestionCard /></TabPanel>
                    <TabPanel value="5"><QuestionCard /></TabPanel>
                    <TabPanel value="6"><QuestionCard /></TabPanel>
                    <TabPanel value="7"><QuestionCard /></TabPanel>
                </TabContext>
            </div>
        </div>
    );
};

export default AdminPage;