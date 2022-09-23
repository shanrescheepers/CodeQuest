import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';

//Import Pages
import Navigation from './components/Navigation';
<<<<<<< HEAD
import AnimatedRoutes from './components/AnimatedRoutes';
=======
import NewQuestionPage from './pages/NewQuestionPage';
>>>>>>> 9012839 (created new question page)

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Navigation />
<<<<<<< HEAD
        <AnimatedRoutes/>
=======
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
>>>>>>> 9012839 (created new question page)
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
