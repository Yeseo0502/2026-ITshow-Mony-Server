import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger.js';
import accountRoutes from './routes/accounts.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';

dotenv.config();

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(requestLogger);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: '✅ Backend is running!',
    timestamp: new Date().toISOString()
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/accounts', accountRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     🚀 Mony Backend Server Started     ║
╚════════════════════════════════════════╝

📍 Server URL: http://localhost:${PORT}
📚 API Docs: http://localhost:${PORT}/api-docs ⭐
🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}

✅ Available Endpoints:
   - GET  /health                    (Server status)
   - POST   /api/accounts            (Create account)
   - GET    /api/accounts            (Get all accounts)
   - GET    /api/accounts/:id        (Get account by ID)
   - PATCH  /api/accounts/:id        (Update account)
   - DELETE /api/accounts/:id        (Delete account)
    `);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Server shutting down...');
  process.exit(0);
});
