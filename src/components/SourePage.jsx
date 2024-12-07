import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Layers, Brain, Heart, Activity, Search, SortDesc } from 'lucide-react';
import _ from 'lodash';

const SourcePage = () => {
  const [selectedDepth, setSelectedDepth] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'rating', 'depth'

  // Sample conversation data - would come from API in production
  const conversations = [
    {
      id: 1,
      title: "The Ancient Conversation: Consciousness as First Principle",
      summary: "Exploring how consciousness itself might be the fundamental organizing principle of reality, preceding even physical phenomena like light.",
      depth: 5,
      timestamp: new Date('2024-03-07'),
      metrics: {
        head: 4.8,
        heart: 4.2,
        gut: 4.5
      },
      branches: 3,
      tags: ['consciousness', 'philosophy', 'physics']
    },
    {
      id: 2,
      title: "Three Bodies of Dialogue: Head, Heart, and Gut",
      summary: "Understanding the three fundamental aspects of quality dialogue and how they manifest in human interaction.",
      depth: 4,
      timestamp: new Date('2024-03-08'),
      metrics: {
        head: 4.5,
        heart: 4.7,
        gut: 4.3
      },
      branches: 5,
      tags: ['dialogue', 'communication', 'psychology']
    },
    {
      id: 3,
      title: "Entropy, Energy, and Information",
      summary: "Investigating the relationship between physical entropy and information processing in conscious systems.",
      depth: 4,
      timestamp: new Date('2024-03-09'),
      metrics: {
        head: 4.9,
        heart: 4.0,
        gut: 4.4
      },
      branches: 4,
      tags: ['physics', 'information', 'entropy']
    }
  ];

  const depthLevels = [
    { level: 5, name: "Foundation", color: "indigo" },
    { level: 4, name: "Integration", color: "purple" },
    { level: 3, name: "Application", color: "blue" },
    { level: 2, name: "Expression", color: "green" },
    { level: 1, name: "Introduction", color: "teal" }
  ];

  // Calculate average rating for sorting
  const getAverageRating = (metrics) => {
    return (metrics.head + metrics.heart + metrics.gut) / 3;
  };

  // Filter and sort conversations
  const filteredConversations = useMemo(() => {
    let result = [...conversations];

    // Apply depth filter
    if (selectedDepth) {
      result = result.filter(conv => conv.depth === selectedDepth);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(conv => 
        conv.title.toLowerCase().includes(query) ||
        conv.summary.toLowerCase().includes(query) ||
        conv.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        result = _.orderBy(result, ['timestamp'], ['desc']);
        break;
      case 'rating':
        result = _.orderBy(result, [conv => getAverageRating(conv.metrics)], ['desc']);
        break;
      case 'depth':
        result = _.orderBy(result, ['depth'], ['desc']);
        break;
    }

    return result;
  }, [conversations, selectedDepth, searchQuery, sortBy]);

  const MetricsDisplay = ({ metrics }) => (
    <div className="flex gap-4 text-sm">
      <div className="flex items-center gap-1">
        <Brain size={16} className="text-blue-500" />
        <span>{metrics.head.toFixed(1)}</span>
      </div>
      <div className="flex items-center gap-1">
        <Heart size={16} className="text-red-500" />
        <span>{metrics.heart.toFixed(1)}</span>
      </div>
      <div className="flex items-center gap-1">
        <Activity size={16} className="text-green-500" />
        <span>{metrics.gut.toFixed(1)}</span>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Begin at the Source</h1>
        <p className="text-gray-600 mb-6">
          Explore foundational conversations that shape our understanding of dialogue,
          consciousness, and human potential. Each level represents a different depth
          of exploration.
        </p>
        
        {/* Search and Sort Controls */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rated</option>
            <option value="depth">Depth Level</option>
          </select>
        </div>

        {/* Depth Level Selector */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {depthLevels.map(({ level, name, color }) => (
            <button
              key={level}
              onClick={() => setSelectedDepth(selectedDepth === level ? null : level)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap
                ${selectedDepth === level 
                  ? `bg-${color}-500 text-white` 
                  : `bg-${color}-50 text-${color}-700 hover:bg-${color}-100`
                }`}
            >
              <Layers size={16} />
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-500 mb-4">
        Showing {filteredConversations.length} conversations
        {selectedDepth ? ` at ${depthLevels.find(d => d.level === selectedDepth).name} level` : ''}
        {searchQuery ? ` matching "${searchQuery}"` : ''}
      </div>

      {/* Conversation Cards */}
      <div className="space-y-4">
        {filteredConversations.map(conversation => (
          <Card 
            key={conversation.id} 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {/* Handle navigation to conversation */}}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{conversation.title}</h3>
                <p className="text-gray-600 mb-4">{conversation.summary}</p>
                <MetricsDisplay metrics={conversation.metrics} />
              </div>
              <div className="text-sm text-gray-500">
                {conversation.branches} branches
              </div>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div>
                Depth: {depthLevels.find(d => d.level === conversation.depth).name}
              </div>
              <div>
                {conversation.timestamp.toLocaleDateString()}
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              {conversation.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SourcePage;