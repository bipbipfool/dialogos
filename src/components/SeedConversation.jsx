import React, { useState, useRef, useEffect } from 'react';
import { Brain, Heart, Activity, ThumbsUp, Heart as HeartIcon, Smile, 
         Angry, MessageSquare, Tag, HelpCircle, MessageCircle } from 'lucide-react';
import { seedConversation } from '../data/seedConversation';
import { saveInteraction, getMessageInteractions } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

const SeedConversation = () => {
  const [selectedText, setSelectedText] = useState('');
  const [selectionCoords, setSelectionCoords] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseType, setResponseType] = useState(null);
  const [highlightedMessageId, setHighlightedMessageId] = useState(null);
  const [messageInteractions, setMessageInteractions] = useState({});
  const conversationRef = useRef(null);

  // Fetch interactions for each message
  useEffect(() => {
    const fetchInteractions = async () => {
      const allInteractions = {};
      for (const message of seedConversation.messages) {
        try {
          const interactions = await getMessageInteractions(message.id);
          allInteractions[message.id] = interactions;
        } catch (error) {
          console.error(`Error fetching interactions for message ${message.id}:`, error);
        }
      }
      setMessageInteractions(allInteractions);
    };

    fetchInteractions();
  }, []);

  const handleTextSelection = (messageId) => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = conversationRef.current.getBoundingClientRect();
      
      setSelectedText(selection.toString());
      setHighlightedMessageId(messageId);
      setSelectionCoords({
        top: rect.top - containerRect.top,
        left: rect.left - containerRect.left
      });
    } else {
      setSelectedText('');
      setSelectionCoords(null);
      setHighlightedMessageId(null);
    }
  };

  const handleReactionClick = (type) => {
    setResponseType(type);
    setShowResponseModal(true);
    setSelectionCoords(null); // Hide the toolbar
  };

  const ResponseModal = () => {
    const [response, setResponse] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!showResponseModal) return null;

    const handleSubmit = async () => {
      if (!response.trim() || isSubmitting) return;
      
      setIsSubmitting(true);
      try {
        const interactionData = {
          id: uuidv4(),
          type: responseType,
          messageId: highlightedMessageId,
          selectedText,
          selectionContext: {
            beforeText: '', // Could add more context here
            afterText: ''
          },
          response: {
            content: response,
            metrics: {
              head: 3.5,
              heart: 3.5,
              gut: 3.5
            }
          }
        };

        const savedInteraction = await saveInteraction(interactionData);
        
        // Update local state with new interaction
        setMessageInteractions(prev => ({
          ...prev,
          [highlightedMessageId]: [
            ...(prev[highlightedMessageId] || []),
            savedInteraction
          ]
        }));

        // Reset form
        setResponse('');
        setShowResponseModal(false);
        setResponseType(null);
        setSelectedText('');
      } catch (error) {
        console.error('Error submitting response:', error);
        // Could add error message display here
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl p-6">
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-2">Responding to:</div>
            <div className="bg-gray-50 p-3 rounded-lg mb-4">{selectedText}</div>
            <div className="text-sm text-gray-500 mb-2">
              Your {responseType === 'question' ? 'question' : 'response'}:
            </div>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="w-full h-32 p-3 border rounded-lg resize-none"
              placeholder={responseType === 'question' 
                ? "What would you like to understand better about this part?"
                : "Share your thoughts on this selection..."}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowResponseModal(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg ${
                isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SelectionToolbar = ({ coords, text }) => {
    if (!coords) return null;

    const reactions = [
      { icon: ThumbsUp, label: 'Like' },
      { icon: HeartIcon, label: 'Love' },
      { icon: Smile, label: 'Haha' },
      { icon: Angry, label: 'Angry' },
      { icon: HelpCircle, label: 'Question', type: 'question' }
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
          {reactions.map(({ icon: Icon, label, type }) => (
            <button
              key={label}
              className="p-1 hover:bg-gray-100 rounded"
              title={label}
              onClick={() => handleReactionClick(type || 'reaction')}
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
              onClick={() => handleReactionClick('rating')}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
        <button
          className="p-1 hover:bg-gray-100 rounded text-purple-500"
          title="Start branch"
          onClick={() => handleReactionClick('branch')}
        >
          <MessageSquare size={16} />
        </button>
      </div>
    );
  };

  const MessageInteractions = ({ messageId }) => {
    const interactions = messageInteractions[messageId] || [];
    
    if (interactions.length === 0) return null;

    return (
      <div className="mt-2 pt-2 border-t">
        {interactions.map(interaction => (
          <div key={interaction.id} className="flex items-start gap-2 mt-2">
            <div className="p-2 bg-gray-100 rounded-lg text-sm flex-1">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle size={14} className="text-gray-500" />
                <span className="text-gray-500">
                  {interaction.type === 'question' ? 'Question' : 'Response'}
                </span>
              </div>
              <div className="text-gray-600">{interaction.response.content}</div>
              {interaction.claudeResponse && (
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  {interaction.claudeResponse.content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div 
        ref={conversationRef}
        className="relative bg-white rounded-lg shadow-md p-6"
      >
        {/* Response Modal */}
        <ResponseModal />
        
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
        
        {/* Selection Toolbar */}
        <SelectionToolbar coords={selectionCoords} text={selectedText} />
        
        {/* Conversation Content */}
        <div className="space-y-6">
          {seedConversation.messages.map(message => (
            <div
              key={message.id}
              className={`p-6 rounded-lg ${
                message.isHuman 
                  ? 'bg-white border'
                  : 'bg-blue-50'
              }`}
            >
              <div 
                className="prose max-w-none"
                onMouseUp={() => handleTextSelection(message.id)}
              >
                {message.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                ))}
              </div>
              <MessageInteractions messageId={message.id} />
            </div>
          ))}
        </div>

        {/* Participation Prompt */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Where would you take this conversation?</h3>
          <p className="text-gray-600 mb-6">
            Select any part of the conversation above that interests you and:
            - React to show how it resonates with you
            - Rate its depth across Head, Heart, and Gut dimensions
            - Start a new branch to explore that idea further
            - Ask questions about concepts you'd like to understand better
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeedConversation;