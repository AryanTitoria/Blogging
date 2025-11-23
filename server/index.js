
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import connection from './database/db.js';
import Router from './routes/routes.js';
import imageRoute from './routes/image-route.js';

dotenv.config();

const app = express();

// Allow CORS only from the client URL (set CLIENT_URL in Railway/Vercel later)
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);
app.use('/file', imageRoute);

// Use PORT from environment (Railway provides this). Fallback to 8000 for local dev.
const PORT = process.env.PORT || 8000;

// Connect to DB first, then start server
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const MONGODB_URL = process.env.MONGODB_URL; // optional full connection string

// Prefer full MONGODB_URL if provided by env; otherwise use connection(USERNAME, PASSWORD)
const startServer = async () => {
  try {
    if (MONGODB_URL) {
      // If your connection() supports a full URI, modify connection to accept it.
      await connection(MONGODB_URL);
    } else {
      await connection(USERNAME, PASSWORD);
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

