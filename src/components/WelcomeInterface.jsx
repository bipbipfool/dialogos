import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Sprout, BookOpen } from 'lucide-react';

const WelcomeInterface = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Main Options */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            Welcome to Dialogos
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Join an evolving dialogue where ideas grow through genuine connection and understanding.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/source')}
              className="p-6 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-semibold">Begin at the Source</span>
              </div>
              <p className="text-sm text-gray-600 text-left">
                Follow the growth of conversations from their seeds.
              </p>
            </button>
            <button
              onClick={() => navigate('/growing')}
              className="p-6 rounded-lg border-2 border-green-200 hover:border-green-400 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <Sprout className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-semibold">What's Growing Now?</span>
              </div>
              <p className="text-sm text-gray-600 text-left">
                Explore active discussions and flourishing branches.
              </p>
            </button>
            <button
              onClick={() => navigate('/journey')}
              className="p-6 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl group-hover:scale-110 transition-transform">🧭</span>
                <span className="text-lg font-semibold">What is Dialogos?</span>
              </div>
              <p className="text-sm text-gray-600 text-left">
                Take a guided journey to understand the art of dialogue.
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Seed Conversation Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h2 className="text-xl font-bold">See the Conversation that Started it All</h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            Explore the foundational dialogue that sparked Dialogos – a deep conversation about consciousness, 
            artificial intelligence, and humanity's collective future. See how genuine dialogue can unfold 
            and branch into new understanding.
          </p>

          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <span>March 30, 2024</span>
              <span>45 min read</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">The Ancient Conversation: Beginning</h3>
            <p className="text-gray-600 line-clamp-3 mb-4">
              A dialogue exploring how consciousness itself might be the fundamental organizing 
              principle of reality, preceding even physical phenomena like light...
            </p>
            <div className="flex gap-2">
              {["consciousness", "dialogue", "AI"].map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/conversation/ancient-beginning')}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors flex items-center justify-center gap-2"
          >
            Read the Full Conversation
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeInterface;