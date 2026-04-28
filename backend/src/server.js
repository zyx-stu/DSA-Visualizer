import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';

// Config & DB
import connectDB from './config/database.js';
import { config } from './config/env.js';

// Middleware
import corsMiddleware from './middleware/cors.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import errorHandler from './middleware/errorHandler.js';

// Routes
import routes from './routes/index.js';

// Services (FIX: no dynamic await import)
import { linearSearch, binarySearch, jumpSearch } from './services/searchService.js';

// Utils
import logger, { loggerMiddleware } from './utils/logger.js';

// Initialize app
const app = express();

// Connect DB
connectDB();

// ------------------- MIDDLEWARE -------------------
app.use(helmet());

// Use your custom CORS if needed, else default
app.use(cors());
app.use(corsMiddleware);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(compression());
app.use(loggerMiddleware);

// Logging
if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
app.use('/api/', apiLimiter);

// ------------------- ROUTES -------------------

// Root
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'DSA Visualizer API is running!',
    version: '1.0.0',
    endpoints: {
      main: '/api',
      search: '/api/search/:algorithm',
    },
  });
});

// Main routes
app.use('/api', routes);

// ------------------- SEARCH ENDPOINT -------------------
app.post('/api/search/:algorithm', (req, res) => {
  try {
    const { algorithm } = req.params;
    const { array, target } = req.body;

    let result;

    switch (algorithm.toLowerCase()) {
      case 'linear':
        result = linearSearch(array, target);
        break;
      case 'binary':
        result = binarySearch(array, target);
        break;
      case 'jump':
        result = jumpSearch(array, target);
        break;
      default:
        return res.status(400).json({ error: 'Invalid search algorithm' });
    }

    res.json({ steps: result });
  } catch (error) {
    logger.error('Search error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ------------------- 404 -------------------
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.url,
  });
});

// ------------------- ERROR HANDLER -------------------
app.use(errorHandler);

// ------------------- START SERVER -------------------
const PORT = config.port || process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   DSA VISUALIZER API                  ║
║   Environment: ${config.env.padEnd(20)}║
║   Port: ${PORT.toString().padEnd(29)}║
║   Status: RUNNING ✅                  ║
╚════════════════════════════════════════╝
  `);
});

// ------------------- UNHANDLED ERRORS -------------------
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});
