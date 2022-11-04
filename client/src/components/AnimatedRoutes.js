import React from 'react'
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminPage from '../pages/AdminPage';
import FeedPage from '../pages/FeedPage';
import ProfilePage from '../pages/ProfilePage';
import IndividualQuestion from '../pages/IndividualQuestion';
import QuestionsPage from '../pages/QuestionsPage';
import Navigation from './Navigation';
import NewQuestionPage from '../pages/NewQuestionPage';
import { useState } from 'react';
import { AnimatePresence } from "framer-motion";
import Footer from '../components/Footer'
import { useEffect, useNavigate } from 'react';
import Axios from 'axios';
import FourOhFour from '../pages/FourohFour';
import ResultPage from "../pages/ResultPage";
import FilterPage from "../pages/FilterPage";
import Auth from '../pages/Auth';
import PassReset from '../pages/PassReset';
import UpdatePass from '../pages/UpdatePass';
import UserDeailsProfilePage from '../pages/UserDeailsProfilePage';

function AnimatedRoutes() {

  const location = useLocation();
  const [showNav, setShowNav] = useState(true);

  // Admin Rights
  const getAdminPermission = (rankId) => {
    if (rankId === 'Diamond') {
      return true;
    } else {
      return false;
    }
  }
  const [rank, setRank] = useState("");
  // Admin Rights Permission
  useEffect(() => {
    const userId = sessionStorage.getItem("id");
    if (userId == null) {
      //   console.log("User not logged in")

    } else {
      //   console.log("user logged in")
      Axios.get('http://localhost:5000/api/userInfo/' + userId)
        .then(res => {
          let data = res.data;

          setRank(data.rank);


        })
    }
  })

  return (

    <>
      {showNav &&
        <nav>
          <Navigation />
        </nav>
      }
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname} >
          <Route path="/" element={<LoginPage funcNav={setShowNav} />} />
          <Route path="/RegisterPage" element={<RegisterPage funcNav={setShowNav} />} />

          <Route path="/SearchPage" element={<ResultPage />} />
          <Route path="/FilterPage" element={<FilterPage />} />

          {getAdminPermission(rank) &&
            <Route path="/AdminPage" element={<AdminPage funcNav={setShowNav} />} />}

          <Route path="/FeedPage" element={<FeedPage funcNav={setShowNav} />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/IndividualQuestion" element={<IndividualQuestion />} />
          <Route path="/QuestionsPage" element={<QuestionsPage />} />
          <Route path="/newquestion" element={<NewQuestionPage />} />
          <Route path="/Auth" element={<Auth funcNav={setShowNav} />} />
          <Route path="/PassReset" element={<PassReset funcNav={setShowNav} />} />
          <Route path="/UpdatePass" element={<UpdatePass funcNav={setShowNav} />} />
          <Route path="*" element={<FourOhFour funcNav={setShowNav} />} />
          <Route path= "/userprofile" element={<UserDeailsProfilePage/>}/>

        </Routes>
      </AnimatePresence>
      {showNav &&
        <footer>
          <Footer />
        </footer>
      }
    </>
  )
}

export default AnimatedRoutes