// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Get current timestamp
const getTimestamp = () => {
  return new Date().toISOString();
};

// Log levels
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
  SUCCESS: 'SUCCESS'
};

// Logger class
class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'INFO';
  }

  // Format log message
  formatMessage(level, message, data = null) {
    const timestamp = getTimestamp();
    const dataStr = data ? `\n${JSON.stringify(data, null, 2)}` : '';
    return `[${timestamp}] [${level}] ${message}${dataStr}`;
  }

  // Error logging
  error(message, error = null) {
    const logMessage = this.formatMessage(LOG_LEVELS.ERROR, message, error);
    console.error(`${colors.red}${logMessage}${colors.reset}`);
    
    if (error && error.stack) {
      console.error(`${colors.red}${error.stack}${colors.reset}`);
    }
  }

  // Warning logging
  warn(message, data = null) {
    const logMessage = this.formatMessage(LOG_LEVELS.WARN, message, data);
    console.warn(`${colors.yellow}${logMessage}${colors.reset}`);
  }

  // Info logging
  info(message, data = null) {
    const logMessage = this.formatMessage(LOG_LEVELS.INFO, message, data);
    console.log(`${colors.blue}${logMessage}${colors.reset}`);
  }

  // Debug logging
  debug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      const logMessage = this.formatMessage(LOG_LEVELS.DEBUG, message, data);
      console.log(`${colors.magenta}${logMessage}${colors.reset}`);
    }
  }

  // Success logging
  success(message, data = null) {
    const logMessage = this.formatMessage(LOG_LEVELS.SUCCESS, message, data);
    console.log(`${colors.green}${logMessage}${colors.reset}`);
  }

  // HTTP request logging
  request(req) {
    const message = `${req.method} ${req.url}`;
    this.info(message, {
      ip: req.ip,
      userAgent: req.get('user-agent')
    });
  }

  // HTTP response logging
  response(req, res, responseTime) {
    const message = `${req.method} ${req.url} - ${res.statusCode} (${responseTime}ms)`;
    
    if (res.statusCode >= 500) {
      this.error(message);
    } else if (res.statusCode >= 400) {
      this.warn(message);
    } else {
      this.success(message);
    }
  }
}

// Create singleton instance
const logger = new Logger();

// Middleware for Express
export const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();
  
  // Log request
  logger.request(req);
  
  // Log response
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    logger.response(req, res, responseTime);
  });
  
  next();
};

export default logger;
