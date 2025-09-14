import { body, param, query, validationResult } from 'express-validator';
import { sendValidationError } from '../utils/responseHelper.js';
import { sanitizeInput } from '../utils/sanitizers.js';

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendValidationError(res, errors.array());
  }
  next();
};

/**
 * Sanitize request body middleware
 */
const sanitizeBody = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }
  next();
};

/**
 * User signup validation
 */
const validateSignup = [
  sanitizeBody,
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 100 })
    .withMessage('Email must be less than 100 characters'),
  
  body('password')
    .isLength({ min: 6, max: 128 })
    .withMessage('Password must be between 6 and 128 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
    .withMessage('Password must contain at least one letter and one number'),
  
  handleValidationErrors
];

/**
 * User login validation
 */
const validateLogin = [
  sanitizeBody,
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isLength({ min: 1, max: 128 })
    .withMessage('Password length invalid'),
  
  handleValidationErrors
];

/**
 * Journal entry validation
 */
const validateJournalEntry = [
  sanitizeBody,
  body('text')
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage('Journal entry must be between 1 and 5000 characters')
    .matches(/^[\s\S]*$/)
    .withMessage('Invalid characters in journal entry'),
  
  handleValidationErrors
];

/**
 * Update journal entry validation
 */
const validateJournalUpdate = [
  param('id')
    .isMongoId()
    .withMessage('Invalid journal entry ID'),
  
  ...validateJournalEntry
];

/**
 * Delete journal entry validation
 */
const validateJournalDelete = [
  param('id')
    .isMongoId()
    .withMessage('Invalid journal entry ID'),
  
  handleValidationErrors
];

/**
 * Pagination validation
 */
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage('Page must be a positive integer less than 1000')
    .toInt(),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt(),
  
  handleValidationErrors
];

/**
 * Emotion trends validation
 */
const validateEmotionTrends = [
  query('days')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('Days must be between 1 and 365')
    .toInt(),
  
  handleValidationErrors
];

/**
 * Password reset request validation
 */
const validateForgotPassword = [
  sanitizeBody,
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  handleValidationErrors
];

/**
 * Password reset validation
 */
const validateResetPassword = [
  sanitizeBody,
  param('token')
    .isLength({ min: 32, max: 128 })
    .withMessage('Invalid reset token'),
  
  body('password')
    .isLength({ min: 6, max: 128 })
    .withMessage('Password must be between 6 and 128 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
    .withMessage('Password must contain at least one letter and one number'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  
  handleValidationErrors
];

/**
 * User profile update validation
 */
const validateProfileUpdate = [
  sanitizeBody,
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('preferences.theme')
    .optional()
    .isIn(['light', 'dark', 'auto'])
    .withMessage('Theme must be light, dark, or auto'),
  
  body('preferences.notifications.email')
    .optional()
    .isBoolean()
    .withMessage('Email notification preference must be boolean'),
  
  body('preferences.notifications.reminders')
    .optional()
    .isBoolean()
    .withMessage('Reminder notification preference must be boolean'),
  
  body('preferences.privacy.profileVisibility')
    .optional()
    .isIn(['public', 'private'])
    .withMessage('Profile visibility must be public or private'),
  
  handleValidationErrors
];

export {
  validateSignup,
  validateLogin,
  validateJournalEntry,
  validateJournalUpdate,
  validateJournalDelete,
  validatePagination,
  validateEmotionTrends,
  validateForgotPassword,
  validateResetPassword,
  validateProfileUpdate,
  sanitizeBody,
  handleValidationErrors
};