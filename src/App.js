import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ShortenURL from './pages/ShortenURL';
import Top100 from './pages/Top100';
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShortenURL />} />
        <Route path="/top100" element={<Top100 />} />
      </Routes>
    </Router>
  );
}

export default App;
