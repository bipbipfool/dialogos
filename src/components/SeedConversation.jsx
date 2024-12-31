import React, { useState, useRef } from 'react';
import { Brain, Heart, Activity, ThumbsUp, Heart as HeartIcon, Smile, Angry, MessageSquare, Tag } from 'lucide-react';
import { seedConversation } from '../data/seedConversation';

const SeedConversation = () => {
  const [selectedText, setSelectedText] = useState('');
  const [selectionCoords, setSelectionCoords] = useState(null);
  const conversationRef = useRef(null);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = conversationRef.current.getBoundingClientRect();
      
      setSelectedText(selection.toString());
      setSelectionCoords({
        top: rect.top - containerRect.top,
        left: rect.left - containerRect.left
      });
    } else {
      setSelectedText('');
      setSelectionCoords(null);
    }
  };

  const SelectionToolbar = ({ coords, text }) => {
    if (!coords) return null;

    const reactions = [
      { icon: ThumbsUp, label: 'Like' },
      { icon: HeartIcon, label: 'Love' },
      { icon: Smile, label: 'Haha' },
      { icon: Angry, label: 'Angry' }
    ];

    const metrics = [
      { icon: Brain, label: 'Head', color: 'text-blue-500' },
      { icon: Heart, label: 'Heart', color: 'text-red-500' },
      { icon: Activity, label: 'Gut', color: 'text-green-500' }
    ];

    return (
      <div 
        className="absolute bg-white shadow-lg rounded-lg p-2 flex gap-2 z-50 border"
        style={{ top: coords.top - 40, left: coords.left }}
      >
        <div className="border-r pr-2">
          {reactions.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="p-1 hover:bg-gray-100 rounded"
              title={label}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
        <div className="border-r pr-2">
          {metrics.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className={`p-1 hover:bg-gray-100 rounded ${color}`}
              title={`Rate ${label}`}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
        <button
          className="p-1 hover:bg-gray-100 rounded text-purple-500"
          title="Start branch"
        >
          <MessageSquare size={16} />
        </button>
      </div>
    );
  };

  const MetricsDisplay = ({ metrics }) => (
    <div className="flex gap-6 p-4 bg-gray-50 rounded-lg mb-6">
      <div className="flex items-center gap-2">
        <Brain className="text-blue-500" />
        <div>
          <div className="text-sm text-gray-500">Head</div>
          <div className="font-medium">{metrics.head.toFixed(1)}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Heart className="text-red-500" />
        <div>
          <div className="text-sm text-gray-500">Heart</div>
          <div className="font-medium">{metrics.heart.toFixed(1)}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Activity className="text-green-500" />
        <div>
          <div className="text-sm text-gray-500">Gut</div>
          <div className="font-medium">{metrics.gut.toFixed(1)}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div 
        ref={conversationRef}
        className="relative bg-white rounded-lg shadow-md p-6"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">{seedConversation.title}</h1>
        <p className="text-gray-600 mb-4">{seedConversation.description}</p>
        
        {/* Tags */}
        <div className="flex gap-2 mb-6">
          {seedConversation.tags.map(tag => (
            <div 
              key={tag}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              <Tag size={12} />
              {tag}
            </div>
          ))}
        </div>

        {/* Overall Metrics */}
        <MetricsDisplay metrics={seedConversation.metrics} />
        
        {/* Selection Toolbar */}
        <SelectionToolbar coords={selectionCoords} text={selectedText} />
        
        {/* Conversation Content */}
        <div 
          onMouseUp={handleTextSelection}
          className="space-y-6"
        >
          {seedConversation.messages.map(message => (
            <div
              key={message.id}
              className={`p-6 rounded-lg ${
                message.isHuman 
                  ? 'bg-white border'
                  : 'bg-blue-50'
              }`}
            >
              <div className="prose max-w-none">
                {message.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeedConversation;