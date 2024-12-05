import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import ChatInterface from './ChatInterface';

const GuidedJourney = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeBranch, setActiveBranch] = useState(null);

  const steps = [
    {
      title: "Welcome to Dialogos",
      content: "Dialogos comes from Ancient Greek, meaning 'through logos' or 'through meaning.' It's more than just conversation - it's a path to deeper understanding and connection.",
      question: "Ready to explore how dialogue can transform our understanding?",
      branches: [
        {
          text: "What is Logos?",
          description: "Explore the ancient concept of Logos and its relevance today",
          type: "chat",
          preset: "logos-guide"
        }
      ]
    },
    {
      title: "The Three Dimensions",
      content: "Quality dialogue engages three vital aspects of human experience: Head (cognitive depth), Heart (emotional resonance), and Gut (practical wisdom).",
      question: "Have you noticed how the best conversations engage your whole being?",
      branches: [
        {
          text: "How do the Three Centers relate to Logos?",
          description: "Discover how these dimensions connect to the deeper pattern of Logos",
          type: "chat",
          preset: "three-centers-guide"
        }
      ]
    },
    {
      title: "Growing Together",
      content: "Like a tree, meaningful dialogue grows over time. Your contributions and insights help create branches of understanding that others can build upon.",
      question: "What kind of conversations would you like to grow?"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBranchSelect = (branch) => {
    setActiveBranch(branch.preset);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Progress indicator */}
        <div className="flex mb-8 justify-center">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-16 mx-1 rounded ${
                index <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
          <p className="text-gray-600 mb-6">{steps[currentStep].content}</p>
          
          {/* Branch options */}
          {steps[currentStep].branches && (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-gray-500">Explore related branches:</p>
              {steps[currentStep].branches.map((branch, index) => (
                <button
                  key={index}
                  onClick={() => handleBranchSelect(branch)}
                  className="w-full p-4 border-2 border-blue-100 rounded-lg hover:border-blue-300 
                           transition-all group text-left flex items-start space-x-3"
                >
                  <ExternalLink className="w-5 h-5 text-blue-500 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-medium text-blue-600 block">{branch.text}</span>
                    <span className="text-sm text-gray-600">{branch.description}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          <p className="text-lg font-medium text-blue-600 mt-6">
            {steps[currentStep].question}
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              currentStep === steps.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Interface Modal */}
      {activeBranch && (
        <ChatInterface 
          preset={activeBranch}
          onClose={() => setActiveBranch(null)}
        />
      )}
    </div>
  );
};

export default GuidedJourney;