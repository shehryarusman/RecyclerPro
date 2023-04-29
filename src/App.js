import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";
import MainPage from './component/MainPage';
import SignUp from './component/SignUp'
import ErrorPage from './component/ErrorPage';
import Nav from './component/Nav';
import News from './component/Article';
import ProductRecomendation from './component/ProductRecomendation';
import LoginPage from './component/LoginPage';
import RecylePage from './component/RecyclePage';


function App() {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/RecyclerPro" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/news" element={<News />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/product" element={<ProductRecomendation />} />
          <Route path="/detect" element={<RecylePage/>}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
