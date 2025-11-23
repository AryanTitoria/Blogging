import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import connection from './database/db.js';
import Router from './routes/routes.js';
import imageRoute from './routes/image-route.js';

dotenv.config();

const app = express();

// ---------------------------------------
// ✅ FIXED CORS CONFIG (works for Vercel + Railway)
// ---------------------------------------
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const CORS_OPTIONS = {
  origin: CLIENT_URL,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

app.use(cors(CORS_OPTIONS));
app.options('*', cors(CORS_OPTIONS));   // Important for preflight

// ---------------------------------------
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', Router);
app.use('/file', imageRoute);

// PORT
const PORT = process.env.PORT || 8000;

// DB Config
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const MONGODB_URL = process.env.MONGODB_URL;

// ---------------------------------------
// ✅ Start Server AFTER DB Connect
// ---------------------------------------
const startServer = async () => {
  try {
    if (MONGODB_URL) {
      await connection(MONGODB_URL);
    } else {
      await connection(USERNAME, PASSWORD);
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("CORS allowed origin:", CLIENT_URL);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();


// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import bodyParser from 'body-parser';

// import connection from './database/db.js';
// import Router from './routes/routes.js';
// import imageRoute from './routes/image-route.js';

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(bodyParser.json({ extended: true}))
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use('/', Router);
// app.use('/file', imageRoute);


// const PORT = 8000;

// app.listen(PORT, () => console.log(`server is running successfully on PORT ${PORT}`));

// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;

// connection(USERNAME, PASSWORD);