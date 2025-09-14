// Simple emotion detection based on keywords
// In production, you might want to use a proper NLP API
const detectEmotion = (text) => {
  const textLower = text.toLowerCase();
  
  const emotionKeywords = {
    happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'love'],
    sad: ['sad', 'depressed', 'unhappy', 'miserable', 'cry', 'tears'],
    anxious: ['anxious', 'nervous', 'worried', 'stress', 'panic', 'overwhelm'],
    angry: ['angry', 'mad', 'frustrated', 'annoyed', 'hate', 'rage'],
    excited: ['excited', 'thrilled', 'pumped', 'eager', 'anticipat'],
    tired: ['tired', 'exhausted', 'fatigue', 'sleepy', 'burnout'],
    grateful: ['grateful', 'thankful', 'appreciate', 'blessed', 'fortunate']
  };

  let maxCount = 0;
  let detectedEmotion = 'neutral';

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    const count = keywords.filter(keyword => textLower.includes(keyword)).length;
    if (count > maxCount) {
      maxCount = count;
      detectedEmotion = emotion;
    }
  }

  return detectedEmotion;
};

const generateSuggestion = (emotion) => {
  const suggestions = {
    happy: "Great to hear you're feeling happy! Consider writing about what brought you joy today.",
    sad: "It's okay to feel sad. Remember to be kind to yourself. Maybe try some deep breathing exercises.",
    anxious: "For anxiety, try the 4-7-8 breathing technique: inhale 4s, hold 7s, exhale 8s.",
    angry: "When feeling angry, try taking a short walk or writing down what's bothering you.",
    excited: "Channel your excitement into something creative or physical!",
    tired: "Make sure to rest and hydrate. Consider a short nap if possible.",
    grateful: "Practicing gratitude is wonderful! Keep focusing on the positive aspects.",
    neutral: "Consider reflecting on what you're looking forward to or what you learned today."
  };

  return suggestions[emotion] || "Thank you for sharing your thoughts. Remember to take care of yourself.";
};

export { detectEmotion, generateSuggestion };