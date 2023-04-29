import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import MainPage from './component/MainPage';
import SignUp from './component/SignUp'
import ErrorPage from './component/ErrorPage';
import Nav from './component/Nav';
import News from './component/Article';
import ProductRecomendation from './component/ProductRecomendation';
import LoginPage from './component/LoginPage';


function App() {
  return (
    <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/news" element={<News />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/product" element={<ProductRecomendation />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
