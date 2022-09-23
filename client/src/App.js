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
import NewQuestionPage from './pages/NewQuestionPage';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/" element={<FeedPage />} />
          <Route path="/FeedPage" element={<FeedPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/IndividualQuestion" element={<IndividualQuestion />} />
          <Route path="/QuestionsPage" element={<QuestionsPage />} />
          <Route path='/newquestion' element={<NewQuestionPage/>}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
