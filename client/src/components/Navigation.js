import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../css/Navigation.css';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import pp from "../assets/placeholderPP.png";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

// import Stack from '@mui/material/Stack';


const Navigation = () => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  const getAdminPermission = (rankId) => {
    if (rankId === '1') {
      return true;
    } else {
      return false;
    }
  }


  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    float: 'left',
    borderRadius: '30px',
    marginTop: '20px',
    boxShadow: 'rgba(0, 0, 0, 0.1) -4px 9px 25px -6px',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
    marginRight: theme.spacing(2),
    marginLeft: '30',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '25%',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    fontFamily: "Open Sans",
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '60ch',
      },
    },
  }));

  return (
    <div>
      <div className="navContainer">

        <div className='topNavBar'>
          <img src={logo} className="Logo" width="150px"></img>


          <Search style={{ marginLeft: "100px", width: "390px" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="What would you like to know?"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Button sx={{
            backgroundColor: '#2b2b2b', borderRadius: '20px', marginTop: "20px", width: '140px', fontFamily: 'Open Sans', marginLeft: '470px',
            '&:hover': {
              backgroundColor: '#4A4A4A',
            }
          }} variant="contained" backgroundColor="primary">Log Out</Button>
        </div>

        <div className='sideNav'>


          <div className='profile-section'>
            <img src={pp} className="profile-Img"></img>
            <h3>Username</h3>
            <h5>Rank | Reliability Score: </h5>
          </div>


          <div className='Navigation'>
            {loggedIn ?
              <div className="list">

                <li><NavLink exact activeclassname="active" to="/FeedPage"><button><HomeOutlinedIcon className='icon' /><div className="text">Feed</div></button></NavLink></li>
                <li><NavLink activeclassname="active" to="/QuestionsPage"><button><QuestionAnswerOutlinedIcon className='icon' /><div className="text">Questions</div></button></NavLink></li>
                <li><NavLink activeclassname="active" to="/ProfilePage"><button><PersonOutlineOutlinedIcon className='icon' /><div className="text">Profile</div></button></NavLink></li>

                {/* BELOW: This will allow for ONLY the ADMIN (based on rank from DB) to view the admin nav icon, and navigate onto the AdminPage */}
                {/* ipv 1 this will be a useState. useState update from axios call that's being plled from the user's ID */}
                {getAdminPermission('1') ?
                  <li><NavLink activeclassname="active" to="/AdminPage">
                    <button><AdminPanelSettingsOutlinedIcon className='icon' />
                      <div className="text">Admin</div>
                    </button>
                  </NavLink>
                  </li>
                  : <span></span>}
              </div>
              : <span></span>
            }
          </div>



        </div>

        <div className='discordBlock'>
          <h6>Join Our</h6>
          <h4>Discord Server</h4>

          <Button sx={{
            backgroundColor: '#FFFFFF', color: '#2b2b2b', fontWeight: 'bold', borderRadius: '20px', marginTop: "20px", width: '140px', fontFamily: 'Open Sans', marginLeft: '600px',
            '&:hover': {
              backgroundColor: '#F6F6FA',
            }
          }} variant="contained" backgroundColor="primary">Join</Button>
        </div>


        {/* <ul>
                        <li><div className="logo">SKY SKATES.</div></li>
                        <div className="list">
                        <li><NavLink exact activeclassname="active" to="/Home"><button className="icon icon1">Home</button></NavLink></li>
                            <li><NavLink activeclassname="active" to="/Shop"><button className="icon icon2">Shop</button></NavLink></li>
                            <li><NavLink activeclassname="active" to="/Admin"><button className="icon icon3">Admin</button></NavLink></li>
                            <li><NavLink activeclassname="active" to="/Cart"><button className="icon icon3"><UilShoppingCart size="18"/></button></NavLink></li>
                            <li><NavLink activeclassname="active" to="/"><button className="icon logout">Log out</button></NavLink></li>
        
        
                        </div>
                        </ul> */}




      </div>

    </div>
  );
};

export default Navigation;