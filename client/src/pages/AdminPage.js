import React from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import '../scss/adminPage.scss';
import bosscatimage from '../assets/adminpage_cat.svg';


const AdminPage = () => {
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
                    <img src={bosscatimage} alt="bosscatimage" className='admin__top__header__catimage' />
                </div>

            </div>
        </div>
    );
};

export default AdminPage;