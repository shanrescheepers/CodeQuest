import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';

//Import Pages
import Navigation from './components/Navigation';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Navigation />
        <AnimatedRoutes/>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
