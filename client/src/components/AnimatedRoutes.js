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

import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {

  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
    <Routes location={location} key={location.pathname} >
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/RegisterPage" element={<RegisterPage />} />
      <Route path="/AdminPage" element={<AdminPage />} />
      <Route path="/" element={<FeedPage />} />
      <Route path="/FeedPage" element={<FeedPage />} />
      <Route path="/ProfilePage" element={<ProfilePage />} />
      <Route path="/IndividualQuestion" element={<IndividualQuestion />} />
      <Route path="/QuestionsPage" element={<QuestionsPage />} />
    </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes