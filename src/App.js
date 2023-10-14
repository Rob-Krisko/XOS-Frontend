import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import Desktop from './components/Desktop';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/desktop" element={<Desktop />} />
      </Routes>
    </Router>
  );
}

export default App;
