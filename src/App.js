// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import WelcomeInterface from './components/WelcomeInterface';
import GuidedJourney from './components/GuidedJourney';
import SourcePage from './components/SourcePage';

function App() {
  return (
    <BrowserRouter>  
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<WelcomeInterface />} />
          <Route path="/source" element={<SourcePage />} />
          <Route path="/journey" element={<GuidedJourney />} />
        </Routes>
      </div>
    </BrowserRouter> 
  );
}

export default App;