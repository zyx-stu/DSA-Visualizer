/**
 * Validate and expose required env variables.
 * Fails fast on missing critical vars in production.
 */
const requiredInProduction = ['MONGODB_URI', 'CORS_ORIGIN'];

if (process.env.NODE_ENV === 'production') {
  const missing = requiredInProduction.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(`❌ Missing required env vars: ${missing.join(', ')}`);
    process.exit(1);
  }
}

module.exports = {
  NODE_ENV:    process.env.NODE_ENV     || 'development',
  PORT:        parseInt(process.env.PORT) || 5000,
  MONGODB_URI: process.env.MONGODB_URI  || 'mongodb://localhost:27017/dsa_visualizer',
  CORS_ORIGIN: process.env.CORS_ORIGIN  || 'http://localhost:5173',
  RATE_LIMIT_WINDOW_MS:    parseInt(process.env.RATE_LIMIT_WINDOW_MS)  || 15 * 60 * 1000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
};
