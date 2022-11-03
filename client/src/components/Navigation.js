import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Navigation.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { useNavigate } from "react-router-dom";
import LogOutModal from "../modals/LogOutModal";
import FeedPage from "../pages/FeedPage";
import QuestionCard from "../components/QuestionCard";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import UpdateAccountInfoModal from "../modals/UpdateAccountInfoModal";

const Navigation = ({ questions, setUpdateQuestions }) => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  const getAdminPermission = (rankId) => {
    if (rankId === "Diamond") {
      return true;
    } else {
      return false;
    }
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderRadius: "30px",
    boxShadow: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px",
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#FFFFFF",
    },
    marginRight: theme.spacing(2),
    marginLeft: "30",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 0,
      width: "150%",
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
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      display: 'block',
    },
  }));

  //================================================================================================
  //Log out
  const navigate = useNavigate();
  const [updateModal, setUpdateModal] = useState();

  const logOut = () => {
    setEditModal(<LogOutModal close={setEditModal} />);
  };

  const goToDiscord = () => {
    window.open("https://discord.gg/GpqtG8dHpn", "_blank");
  };

 
  //========================================

  // Search log

  const SearchBtn = () => {
    let searchText = document.getElementById("search").value;

    navigate("/SearchPage");
    window.location.reload(false);
    //send question id to session storage
    sessionStorage.setItem("SearchText", searchText);
  };

  //======================================================
  //verify User

  // useEffect(()=>{

  //     let verifyUser = {token: sessionStorage.getItem('token')};
  //     if(!verifyUser.token){
  //       navigate('/');
  //       sessionStorage.clear();
  //     }else{
  //       Axios.post('http://localhost:5000/api/verifytoken', verifyUser)
  //       .then(res =>{
  //         console.log(res.data);
  //         if(res.data.verified === false){
  //           navigate('/');
  //           sessionStorage.clear();

  //         }
  //       })
  //     }

  //   }, []);

  //================================================================================================
  //User Info

  const [username, setUsername] = useState();
  const [rank, setRank] = useState();
  const [profileImg, setprofileImg] = useState();
  const [year, setYear] = useState();
  const [userId, setuserId] = useState();

  useEffect(() => {
    const userId = sessionStorage.getItem("id");

    setuserId(userId);
    if (userId == null) {
      // console.log("User not logged in");
    } else {
      // console.log("user logged in");
      Axios.get("http://localhost:5000/api/userInfo/" + userId).then((res) => {
        let data = res.data;
        setUsername(data.username);
        setRank(data.rank);
        setprofileImg(data.profileimage);
        setYear(data.yearlevel);
        // console.log(data.rank);
      });
    }
    // localStorage.clear();
  });

  //get profile image path
  const imgURL = "Avatars/" + profileImg + ".png";

  // console.log(year);
  let bgColor = "";

  if (year === 1) {
    bgColor = "#6EEB83";
  } else if (year === 2) {
    bgColor = "#6CD4FF";
  } else {
    bgColor = "#FF7900";
  }

  //=====================================================================================
  //Log out modal
  // Handle Modal
  const [editModal, setEditModal] = useState();
  const [postConfirmation, setSearchResult] = useState();
  const doSomeStuff = () => {
    Axios.get("http://localhost:5000/api/readquestions").then((res) => {
      let questionData = res.data;

      let a = questionData.filter((items) => items.title == "Test");

      console.log(a);

      a.map((item) => {
        console.log("do something");

        setSearchResult(
          <QuestionCard
            key={item._id}
            questionId={item._id}
            date={item.datePosted}
            title={item.title}
            description={item.description}
            upvotes={item.upvotes}
            downvotes={item.downvotes}
            userId={item.userId}
            editRender={setUpdateQuestions}
          />
        );
      });
    });
  };

  const updatePopUp = () =>{
    setUpdateModal(<UpdateAccountInfoModal close={setUpdateModal} username={username} profileImg={profileImg} userId={userId}/>);
  };


  return (
    <div>
      {editModal}
      {updateModal}
      <div className="navContainer">
        <div className="top-nav">
          <img src={logo} className="Logo"></img>

          <div className="search-block">
            <Search >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase onKeyPress={(e) => {
                if (e.key === "Enter") {
                  SearchBtn()
                }
              }}
                sx={{ display: 'block' }}
                placeholder="What would you like to know?"
                inputProps={{ "aria-label": "search" }}
                id="search"
              />
            </Search>

            <Button
              sx={{
                backgroundColor: "#2b2b2b",
                borderRadius: "50px",
                height: "auto",
                width: "180px",
                fontFamily: "Open Sans",

                "&:hover": {
                  backgroundColor: "#4A4A4A",
                },
                textTransform: 'capitalize'
              }}
              disableElevation
              variant="contained"
              backgroundColor="primary"
              onClick={SearchBtn}
            >
              Search
            </Button>

          </div>

          <Button
            sx={{
              backgroundColor: "#2b2b2b",
              borderRadius: "50px",
              height: "auto",
              // marginTop: "25px",
              width: "130px",
              fontFamily: "Open Sans",
              textTransform: 'capitalize',
              marginRight: "13px",
              "&:hover": {
                backgroundColor: "#4A4A4A",
              },
            }}
            disableElevation
            size="medium"
            variant="contained"
            backgroundColor="primary"
            onClick={logOut}
          >
            Log Out
          </Button>
        </div>

        <div className="sideNav">
          <div className="profile-section">
            <div className="profileCircle" style={{ backgroundColor: bgColor }}>
              <img src={imgURL} className="profile-Img"></img>
            </div>

            <div className="grouped"><h3>{username}</h3><div className="editIcon"><ModeEditIcon fontSize="small" onClick={updatePopUp}/></div></div>
            <h5>{rank} </h5>
          </div>

          <div className="Navigation">
            {loggedIn ? (
              <div className="list">
                <li>
                  <NavLink activeclassname="active" to="/FeedPage">
                    <button>
                      <HomeOutlinedIcon className='icon' />
                      Feed
                    </button>
                  </NavLink>
                </li>

                <li>
                  <NavLink activeclassname="active" to="/QuestionsPage">
                    <button>
                      <QuestionAnswerOutlinedIcon className='icon' />
                      Questions
                    </button>
                  </NavLink>
                </li>

                <li>
                  <NavLink activeclassname="active" to="/ProfilePage">
                    <button>
                      <PersonOutlineOutlinedIcon className='icon' />
                      Profile
                    </button>
                  </NavLink>
                </li>

                {/* BELOW: This will allow for ONLY the ADMIN (based on rank from DB) to view the admin nav icon, and navigate onto the AdminPage */}
                {/* ipv 1 this will be a useState. useState update from axios call that's being plled from the user's ID */}
                {getAdminPermission(rank) ? (

                  <li>
                    <NavLink activeclassname="active" to="/AdminPage">
                      <button>
                        <AdminPanelSettingsOutlinedIcon className='icon' />
                        Admin
                      </button>
                    </NavLink>
                  </li>
                ) : (
                  <span></span>
                )}
              </div>
            ) : (
              <span></span>
            )}
          </div>

          <div className="discordBlock">
            <h6>Join Our</h6>
            <h4>Discord Server</h4>

            <Button
              sx={{
                backgroundColor: "#FFFFFF",
                height: "42px",
                color: "#2b2b2b",
                fontWeight: "bold",
                borderRadius: "20px",
                marginTop: "20px",
                width: "140px",
                fontFamily: "Open Sans",
                marginLeft: "600px",
                "&:hover": {
                  backgroundColor: "#F6F6FA",
                },
              }}
              variant="contained"
              backgroundColor="primary"
              onClick={goToDiscord}
            >
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
