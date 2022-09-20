import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Router } from 'react-router-dom';

//Import Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import IndividualQuestion from './pages/IndividualQuestion';
import QuestionsPage from './pages/QuestionsPage';
import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {

   const [showNav, setShowNav]= useState(true);
  return (
    <div className="App">

      <BrowserRouter>
      {   showNav &&
          <nav>
            <Navigation />
          </nav>
   } 
        <Routes>
          <Route path="/LoginPage" element={<LoginPage funcNav={setShowNav} />} />
          <Route path="/RegisterPage" element={<RegisterPage funcNav={setShowNav}/>} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/" element={<FeedPage />} />
          <Route path="/FeedPage" element={<FeedPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/IndividualQuestion" element={<IndividualQuestion />} />
          <Route path="/QuestionsPage" element={<QuestionsPage />} />
        </Routes>
      </BrowserRouter>

      
      {/* <Footer /> */}
    </div>
  );
}

export default App;
