import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import "./App.css";
import "./Map.css"
import DonatePage from './component/RecyclePage';
import Nav from './component/Nav';
import News from './component/News';
import Map from './component/Map';
import Center from './component/Center'
import { DonationProvider } from './component/DonationContext';


function App() {
  return (
    <BrowserRouter>
      <DonationProvider>
        <Nav />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/donatepage" element={<RecyclePage/>} />
          <Route path="/map" element={<Map />} />
          <Route path="/center" element={<Center />} />

        </Routes>
      </DonationProvider>
    </BrowserRouter>
  );
}

export default App;
