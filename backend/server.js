import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import accountRoutes from './routes/accounts.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';

dotenv.config();

const app = express();

// Middleware
app.use(requestLogger);
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
    res.json({ 
        status: '✅ Backend is running!',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/accounts', accountRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.path} not found`
    });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`
Backend running on http://localhost:${PORT}
Frontend: ${process.env.FRONTEND_URL}
    `);
});