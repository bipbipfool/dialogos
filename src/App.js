// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeInterface from './components/WelcomeInterface';
import GuidedJourney from './components/GuidedJourney';
import SourcePage from './components/SourcePage';
import SeedConversation from './components/SeedConversation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeInterface />} />
        <Route path="/journey" element={<GuidedJourney />} />
        <Route path="/source" element={<SourcePage />} />
        <Route path="/growing" element={<div>Growing conversations coming soon...</div>} />
        <Route path="/conversation/ancient-beginning" element={<SeedConversation />} />
      </Routes>
    </Router>
  );
}

export default App;