import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';
import { AppError, ErrorFactory } from '../utils/AppError.js';
import logger from '../utils/logger.js';
import { sendResponse } from '../utils/responseHelper.js';
import { sanitizeUser } from '../utils/sanitizers.js';
/**
 * Generate JWT token
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const signToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new AppError('JWT_SECRET is not defined', 500);
  }
  
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

/**
 * Create and send JWT token response
 * @param {Object} user - User object
 * @param {number} statusCode - HTTP status code
 * @param {Object} res - Express response object
 * @param {string} message - Response message
 */
const createSendToken = (user, statusCode, res, message = 'Success') => {
  const token = signToken(user._id);
  
  // Cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  // Send cookie in production
  if (process.env.NODE_ENV === 'production') {
    res.cookie('jwt', token, cookieOptions);
  }

  sendResponse(res, statusCode, {
    success: true,
    message,
    token,
    user: sanitizeUser(user)
  });
};

/**
 * User signup
 * @route POST /api/auth/signup
 * @access Public
 */
const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return next(ErrorFactory.conflict('User already exists with this email'));
  }

  // Create new user
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase(),
    password
  });

  logger.info(`New user registered: ${email}`, {
    userId: user._id,
    email: user.email,
    ip: req.ip
  });

  createSendToken(user, 201, res, 'User registered successfully');
});

/**
 * User login
 * @route POST /api/auth/login
 * @access Public
 */
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user and include password for comparison
  const user = await User.findOne({ email: email.toLowerCase() })
    .select('+password +loginAttempts +lockUntil');

  if (!user || !(await user.correctPassword(password, user.password))) {
    logger.warn(`Failed login attempt: ${email}`, {
      email,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    return next(ErrorFactory.unauthorized('Invalid email or password'));
  }

  // Check if account is locked
  if (user.isLocked) {
    logger.warn(`Login attempt on locked account: ${email}`, {
      userId: user._id,
      email,
      ip: req.ip
    });
    return next(ErrorFactory.unauthorized('Account is temporarily locked. Please try again later.'));
  }

  // Reset login attempts on successful login
  if (user.loginAttempts && user.loginAttempts > 0) {
    await user.updateOne({
      $unset: {
        loginAttempts: 1,
        lockUntil: 1
      }
    });
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  logger.info(`User logged in: ${email}`, {
    userId: user._id,
    email: user.email,
    ip: req.ip
  });

  createSendToken(user, 200, res, 'Login successful');
});

/**
 * User logout
 * @route POST /api/auth/logout
 * @access Private
 */
const logout = asyncHandler(async (req, res) => {
  // Clear cookie
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  logger.info(`User logged out: ${req.user.email}`, {
    userId: req.user._id,
    ip: req.ip
  });

  sendResponse(res, 200, {
    success: true,
    message: 'Logged out successfully'
  });
});

/**
 * Refresh token
 * @route POST /api/auth/refresh
 * @access Private
 */
const refreshToken = asyncHandler(async (req, res) => {
  const user = req.user;
  createSendToken(user, 200, res, 'Token refreshed successfully');
});

/**
 * Forgot password
 * @route POST /api/auth/forgot-password
 * @access Public
 */
const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    // Don't reveal if user exists or not
    return sendResponse(res, 200, {
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.'
    });
  }

  // Generate reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  logger.info(`Password reset requested: ${email}`, {
    userId: user._id,
    ip: req.ip
  });

  // In production, send email here
  // For now, just return success message
  sendResponse(res, 200, {
    success: true,
    message: 'Password reset token generated',
    ...(process.env.NODE_ENV === 'development' && { resetToken })
  });
});

/**
 * Reset password
 * @route POST /api/auth/reset-password/:token
 * @access Public
 */
const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  // Hash token and find user
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(ErrorFactory.badRequest('Token is invalid or has expired'));
  }

  // Set new password
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  logger.info(`Password reset successful: ${user.email}`, {
    userId: user._id,
    ip: req.ip
  });

  createSendToken(user, 200, res, 'Password reset successful');
});

export { 
  signup, 
  login, 
  logout, 
  refreshToken, 
  forgotPassword, 
  resetPassword 
};