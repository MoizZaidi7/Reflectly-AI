import mongoSanitize from 'express-mongo-sanitize';

/**
 * Sanitize user data for public consumption
 * @param {Object} user - User object
 * @returns {Object} Sanitized user data
 */
const sanitizeUser = (user) => {
  if (!user) return null;
  
  const userObj = user.toObject ? user.toObject() : user;
  
  return {
    id: userObj._id,
    name: userObj.name,
    email: userObj.email,
    avatar: userObj.avatar,
    role: userObj.role,
    isActive: userObj.isActive,
    isEmailVerified: userObj.isEmailVerified,
    lastLogin: userObj.lastLogin,
    preferences: userObj.preferences,
    createdAt: userObj.createdAt,
    updatedAt: userObj.updatedAt
  };
};

/**
 * Sanitize journal entry data
 * @param {Object} entry - Journal entry object
 * @returns {Object} Sanitized journal entry data
 */
const sanitizeJournalEntry = (entry) => {
  if (!entry) return null;
  
  const entryObj = entry.toObject ? entry.toObject() : entry;
  
  return {
    id: entryObj._id,
    text: entryObj.text,
    date: entryObj.date,
    detectedEmotion: entryObj.detectedEmotion,
    aiSuggestion: entryObj.aiSuggestion,
    createdAt: entryObj.createdAt,
    updatedAt: entryObj.updatedAt
  };
};

/**
 * Sanitize input to prevent NoSQL injection
 * @param {Object} obj - Object to sanitize
 * @returns {Object} Sanitized object
 */
const sanitizeInput = (obj) => {
  return mongoSanitize.sanitize(obj, {
    replaceWith: '_'
  });
};

/**
 * Remove sensitive fields from any object
 * @param {Object} obj - Object to clean
 * @param {Array} fieldsToRemove - Fields to remove
 * @returns {Object} Cleaned object
 */
const removeSensitiveFields = (obj, fieldsToRemove = ['password', '__v', 'passwordResetToken', 'emailVerificationToken']) => {
  if (!obj) return null;
  
  const cleaned = { ...obj };
  fieldsToRemove.forEach(field => {
    delete cleaned[field];
  });
  
  return cleaned;
};

/**
 * Sanitize array of objects
 * @param {Array} array - Array to sanitize
 * @param {Function} sanitizer - Sanitization function
 * @returns {Array} Sanitized array
 */
const sanitizeArray = (array, sanitizer) => {
  if (!Array.isArray(array)) return [];
  return array.map(item => sanitizer(item)).filter(Boolean);
};

export {
  sanitizeUser,
  sanitizeJournalEntry,
  sanitizeInput,
  removeSensitiveFields,
  sanitizeArray
};