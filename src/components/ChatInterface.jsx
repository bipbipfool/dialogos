import React, { useState, useEffect } from 'react';
import { X, Brain, Heart, Activity } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const ChatInterface = ({ preset, onClose }) => {
  // Enhanced message state with full data structure
  const [conversation, setConversation] = useState({
    id: uuidv4(),
    title: preset === 'logos-guide' ? 'Exploring Logos' : 'Three Centers Dialogue',
    summary: '',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    depth: 1,
    tags: [],
    messages: [],
    branches: []
  });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize conversation with preset message
  useEffect(() => {
    if (chatPresets[preset]) {
      const initialMessage = {
        id: uuidv4(),
        content: chatPresets[preset].initialMessage,
        isAI: true,
        timestamp: new Date().toISOString(),
        metrics: {
          head: 4.0,
          heart: 4.0,
          gut: 4.0,
          ratings: []
        }
      };
      
      setConversation(prev => ({
        ...prev,
        messages: [initialMessage]
      }));
    }
  }, [preset]);

  const sendToClaude = async (message) => {
    try {
      const serverUrl = `${process.env.REACT_APP_SERVER_URL}/chat`;
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message,
          preset,
          conversationId: conversation.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error in sendToClaude:', error);
      return "I'm sorry, I encountered an error. Please try again.";
    }
  };

  const saveConversation = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(conversation)
      });

      if (!response.ok) {
        throw new Error('Failed to save conversation');
      }

      console.log('Conversation saved successfully');
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Create new user message
    const userMessage = {
      id: uuidv4(),
      content: inputValue,
      isAI: false,
      timestamp: new Date().toISOString(),
      metrics: {
        head: 3.5,
        heart: 3.5,
        gut: 3.5,
        ratings: []
      }
    };

    // Update conversation with user message
    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      updated: new Date().toISOString()
    }));

    setInputValue('');
    setIsLoading(true);

    // Get Claude's response
    const responseText = await sendToClaude(inputValue);
    
    // Create AI message
    const aiMessage = {
      id: uuidv4(),
      content: responseText,
      isAI: true,
      timestamp: new Date().toISOString(),
      metrics: {
        head: 4.0,
        heart: 4.0,
        gut: 4.0,
        ratings: []
      }
    };

    // Update conversation with AI response
    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, aiMessage],
      updated: new Date().toISOString()
    }));

    setIsLoading(false);
    
    // Save conversation after each exchange
    await saveConversation();
  };

  const MetricsDisplay = ({ metrics }) => (
    <div className="flex gap-2 text-xs text-gray-500 mt-2">
      <div className="flex items-center gap-1">
        <Brain size={12} className="text-blue-500" />
        <span>{metrics.head.toFixed(1)}</span>
      </div>
      <div className="flex items-center gap-1">
        <Heart size={12} className="text-red-500" />
        <span>{metrics.heart.toFixed(1)}</span>
      </div>
      <div className="flex items-center gap-1">
        <Activity size={12} className="text-green-500" />
        <span>{metrics.gut.toFixed(1)}</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">{conversation.title}</h3>
          <button 
            onClick={() => {
              saveConversation();
              onClose();
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversation.messages.map((message) => (
            <div 
              key={message.id}
              className={`p-3 rounded-lg max-w-[80%] ${
                message.isAI 
                  ? 'bg-blue-50 text-blue-900' 
                  : 'bg-gray-100 text-gray-900 ml-auto'
              }`}
            >
              <div>{message.content}</div>
              <MetricsDisplay metrics={message.metrics} />
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