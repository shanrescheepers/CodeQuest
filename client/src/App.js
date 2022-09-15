import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <TopNavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/adminmanager" element={<AdminPage />} />
          <Route path="/" element={<Homepage />} />
          {/* {/* <Route path="/printshop" element={<Homepage />} /> */}
          <Route path="/printshop" element={<ShopImages />} />
          <Route path="/productpage" element={<ProductPage />} />
          <Route path="/theartists" element={<Artists />} />
          <Route path="/cartpage" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
