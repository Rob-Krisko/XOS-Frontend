import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Desktop from './components/Desktop/Desktop';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import { WindowProvider } from './components/Contexts/WindowContext';

function App() {
  return (
    <Router>
      <WindowProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/desktop" element={<Desktop />} />
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          {/* You can add more routes here as needed */}
        </Routes>
      </WindowProvider>
    </Router>
  );
}

export default App;
