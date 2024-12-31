// src/types/interactions.js

// Types of interactions a user can have with the conversation
export const InteractionTypes = {
    REACTION: 'reaction',
    QUESTION: 'question',
    RATING: 'rating',
    BRANCH: 'branch'
  };
  
  // Structure for storing interactions
  export const InteractionSchema = {
    id: String,                    // Unique ID for the interaction
    type: InteractionTypes,        // Type of interaction
    messageId: String,             // ID of the original message
    selectedText: String,          // The highlighted text
    selectionContext: {            // Context of the selection
      beforeText: String,          // Text before selection
      afterText: String            // Text after selection
    },
    response: {                    // User's response
      content: String,             // What they wrote
      metrics: {                   // Automatically calculated metrics
        head: Number,
        heart: Number,
        gut: Number
      }
    },
    claudeResponse: {              // AI's response
      content: String,
      metrics: {
        head: Number,
        heart: Number,
        gut: Number
      }
    },
    timestamp: Date,               // When the interaction occurred
    parentInteractionId: String    // For branching conversations
  };