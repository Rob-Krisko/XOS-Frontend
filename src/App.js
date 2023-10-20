import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Desktop from './components/Desktop';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/desktop" element={<Desktop />} />
            <Route path="/profile/:username" element={<UserProfile />} />
        </Routes>
    </Router>
  );
}

export default App;
