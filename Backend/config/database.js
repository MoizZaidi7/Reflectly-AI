import mongoose from 'mongoose';
import logger from '../utils/logger.js';

/**
 * Database configuration and connection
 */
class Database {
  constructor() {
    this.connection = null;
    this.isConnecting = false;
  }

  /**
   * Connect to MongoDB
   */
  async connect() {
    if (this.connection || this.isConnecting) {
      return this.connection;
    }

    this.isConnecting = true;

    try {
      // Validate environment variables
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is required');
      }

      // Connection options
      const options = {
  maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE) || 10,
  minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE) || 2,
  maxIdleTimeMS: parseInt(process.env.DB_MAX_IDLE_TIME) || 30000,
  serverSelectionTimeoutMS: parseInt(process.env.DB_SERVER_SELECTION_TIMEOUT) || 5000,
  socketTimeoutMS: parseInt(process.env.DB_SOCKET_TIMEOUT) || 45000,
  connectTimeoutMS: parseInt(process.env.DB_CONNECT_TIMEOUT) || 10000,

  // Retry options
  retryWrites: true,
  retryReads: true,

  // Authentication
  authSource: 'admin',

  // Monitoring
  heartbeatFrequencyMS: 10000,

  ...(process.env.NODE_ENV === 'production' && {
    readPreference: 'secondaryPreferred',
    w: 'majority',
    j: true,
    wtimeoutMS: 5000
  })
};

      // Set mongoose options
      mongoose.set('strictQuery', false);
      
      if (process.env.NODE_ENV === 'development') {
        mongoose.set('debug', true);
      }

      // Connect to database
      const conn = await mongoose.connect(process.env.MONGODB_URI, options);
      
      this.connection = conn;
      this.isConnecting = false;

      logger.info(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`, {
        host: conn.connection.host,
        port: conn.connection.port,
        database: conn.connection.name,
        readyState: conn.connection.readyState
      });

      // Set up connection event handlers
      this.setupEventHandlers();

      return conn;
    } catch (error) {
      this.isConnecting = false;
      logger.error('Database connection error:', {
        message: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  /**
   * Set up database connection event handlers
   */
  setupEventHandlers() {
    const db = mongoose.connection;

    // Connection events
    db.on('connected', () => {
      logger.info('Mongoose connected to MongoDB');
    });

    db.on('error', (error) => {
      logger.error('Mongoose connection error:', error);
    });

    db.on('disconnected', () => {
      logger.warn('Mongoose disconnected from MongoDB');
    });

    // Reconnection events
    db.on('reconnected', () => {
      logger.info('Mongoose reconnected to MongoDB');
    });

    db.on('reconnectFailed', () => {
      logger.error('Mongoose reconnection failed');
    });

    // Application termination events
    process.on('SIGINT', this.gracefulClose.bind(this));
    process.on('SIGTERM', this.gracefulClose.bind(this));
  }

  /**
   * Graceful database connection close
   */
  async gracefulClose() {
    try {
      await mongoose.connection.close();
      logger.info('Mongoose connection closed through app termination');
      process.exit(0);
    } catch (error) {
      logger.error('Error closing mongoose connection:', error);
      process.exit(1);
    }
  }

  /**
   * Check database connection health
   */
  async healthCheck() {
    try {
      const state = mongoose.connection.readyState;
      const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
      };

      if (state === 1) {
        // Perform a simple operation to verify connection
        await mongoose.connection.db.admin().ping();
        return {
          status: 'healthy',
          state: states[state],
          host: mongoose.connection.host,
          port: mongoose.connection.port,
          database: mongoose.connection.name
        };
      } else {
        return {
          status: 'unhealthy',
          state: states[state]
        };
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }

  /**
   * Get database statistics
   */
  async getStats() {
    try {
      if (mongoose.connection.readyState !== 1) {
        throw new Error('Database not connected');
      }

      const stats = await mongoose.connection.db.stats();
      return {
        collections: stats.collections,
        dataSize: stats.dataSize,
        storageSize: stats.storageSize,
        indexes: stats.indexes,
        indexSize: stats.indexSize,
        objects: stats.objects
      };
    } catch (error) {
      logger.error('Error getting database stats:', error);
      throw error;
    }
  }

  /**
   * Disconnect from database
   */
  async disconnect() {
    try {
      if (this.connection) {
        await mongoose.disconnect();
        this.connection = null;
        logger.info('Database disconnected successfully');
      }
    } catch (error) {
      logger.error('Error disconnecting from database:', error);
      throw error;
    }
  }
}

// Create singleton instance
const database = new Database();

/**
 * Connect to database (backward compatibility)
 */
const connectDB = async () => {
  return await database.connect();
};

export { connectDB, database };