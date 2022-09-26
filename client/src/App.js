import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';

//Import Pages
import Navigation from './components/Navigation';


import AnimatedRoutes from './components/AnimatedRoutes';
import Footer from './components/Footer';

function App() {

  return (
    <div className="App">

        <BrowserRouter>
            <AnimatedRoutes/>
        </BrowserRouter>
        <Footer/>
    </div>
  );
}


export default App;
