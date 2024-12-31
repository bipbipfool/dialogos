// src/services/api.js

const API_URL = process.env.REACT_APP_SERVER_URL;

export const saveInteraction = async (interactionData) => {
  try {
    const response = await fetch(`${API_URL}/interactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(interactionData)
    });

    if (!response.ok) {
      throw new Error('Failed to save interaction');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving interaction:', error);
    throw error;
  }
};

export const getMessageInteractions = async (messageId) => {
  try {
    const response = await fetch(`${API_URL}/interactions/message/${messageId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get interactions');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting interactions:', error);
    throw error;
  }
};

export const getBranches = async (parentId) => {
  try {
    const response = await fetch(`${API_URL}/interactions/branches/${parentId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get branches');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting branches:', error);
    throw error;
  }
};