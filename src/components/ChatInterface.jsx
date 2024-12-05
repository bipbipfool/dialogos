// src/components/ChatInterface.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

const chatPresets = {
  'logos-guide': {
    initialMessage: `Let's explore the concept of Logos together. Logos is a profound idea that has shaped human thought for thousands of years. Would you like to understand:
    
1. The historical meaning of Logos?
2. How Logos relates to meaning and understanding?
3. Why Logos matters in dialogue?

What interests you most?`
  },
  'three-centers-guide': {
    initialMessage: `The three centers - Head, Heart, and Gut - represent different ways we engage with reality and process information. Each plays a vital role in meaningful dialogue. Would you like to explore:

1. How these centers work together?
2. Why all three are necessary for deep understanding?
3. How to recognize which center you're operating from?

What would you like to understand better?`
  }
};

const ChatInterface = ({ preset, onClose }) => {
  const [messages, setMessages] = useState([
    { text: chatPresets[preset].initialMessage, isAI: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendToClaude = async (message) => {
    try {
      console.log('Sending message to server:', { message, preset });
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message,
          preset
        })
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      console.log('Received response:', data);
      return data.response;
    } catch (error) {
      console.error('Error in sendToClaude:', error);
      return "I'm sorry, I encountered an error. Please try again.";
    }
};

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { text: userMessage, isAI: false }]);
    setInputValue('');
    setIsLoading(true);

    // Get actual response from Claude
    const response = await sendToClaude(userMessage);
    setMessages(prev => [...prev, { text: response, isAI: true }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Exploring Understanding</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                message.isAI 
                  ? 'bg-blue-50 text-blue-900' 
                  : 'bg-gray-100 text-gray-900 ml-auto'
              }`}
            >
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div className="bg-blue-50 text-blue-900 p-3 rounded-lg max-w-[80%]">
              <span className="animate-pulse">Claude is thinking...</span>
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-2 border rounded"
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className={`px-4 py-2 rounded ${
                isLoading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;