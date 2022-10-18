import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import Auth from './pages/Auth';

//Import Pages
import Navigation from './components/Navigation';


import AnimatedRoutes from './components/AnimatedRoutes';


function App() {

  return (
    <div className="App">

        <BrowserRouter>
            <AnimatedRoutes/>
            <Auth/>
        </BrowserRouter>

    </div>
  );
}


export default App;
