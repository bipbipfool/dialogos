// WelcomeInterface.jsx
import React, { useState } from 'react';
import { Clock, Sprout } from 'lucide-react';
import GuidedJourney from './GuidedJourney';

const WelcomeInterface = () => {
 const [selectedView, setSelectedView] = useState(null);

 return (
   <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
     {!selectedView ? (
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
               onClick={() => setSelectedView('beginning')}
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
               onClick={() => setSelectedView('growing')}
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
               onClick={() => setSelectedView('journey')}
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
     ) : selectedView === 'journey' ? (
       <GuidedJourney />
     ) : null}
   </div>
 );
};

export default WelcomeInterface;