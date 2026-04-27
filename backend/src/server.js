import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import connectDB from './config/database.js';
import { config } from './config/env.js';
import corsMiddleware from './middleware/cors.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';

// Initialize app
const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());
app.use(corsMiddleware);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
app.use('/api/', apiLimiter);

// Routes
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'DSA Visualizer API',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

app.use('/api', routes);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   DSA VISUALIZER API                   ║
║   Environment: ${config.env.padEnd(20)}   ║
║   Port: ${PORT.toString().padEnd(29)}   ║
║   Status: RUNNING ✅                   ║
╚════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});
