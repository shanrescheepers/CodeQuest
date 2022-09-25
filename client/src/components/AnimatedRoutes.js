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

function AnimatedRoutes() {

  const location = useLocation();
  const [showNav, setShowNav]= useState(true);

  return (

    <>
     {   showNav &&
          <nav>
            <Navigation />
          </nav>
   } 
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname} >
        <Route path="/" element={<LoginPage funcNav={setShowNav} />} />
        <Route path="/RegisterPage" element={<RegisterPage funcNav={setShowNav} />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/FeedPage" element={<FeedPage funcNav={setShowNav} />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/IndividualQuestion" element={<IndividualQuestion />} />
        <Route path="/QuestionsPage" element={<QuestionsPage />} />
        <Route path="/newquestion" element={<NewQuestionPage />} />
      </Routes>
    </AnimatePresence>

    </>
  )
}

export default AnimatedRoutes