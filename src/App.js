import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Single import of BrowserRouter as Router
import HeaderFile from './components/inc/HeaderFile';
import Homepage from './components/pages/Homepage';
import Loginpage from './components/pages/Loginpage';

function App() {
  return (
    <Router>
      
      <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/Homepage" element={<Homepage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
