// src/utils/constants.js
export const EMOTIONS = {
  happy: { color: '#10B981', label: 'Happy', emoji: '😊' },
  sad: { color: '#6B7280', label: 'Sad', emoji: '😢' },
  anxious: { color: '#F59E0B', label: 'Anxious', emoji: '😰' },
  angry: { color: '#EF4444', label: 'Angry', emoji: '😠' },
  neutral: { color: '#8B5CF6', label: 'Neutral', emoji: '😐' },
  excited: { color: '#F97316', label: 'Excited', emoji: '🤩' },
  tired: { color: '#64748B', label: 'Tired', emoji: '😴' },
  grateful: { color: '#14B8A6', label: 'Grateful', emoji: '🙏' }
};

export const EMOTION_COLORS = Object.values(EMOTIONS).map(emotion => emotion.color);