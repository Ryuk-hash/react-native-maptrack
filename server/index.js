// Importing dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config({ path: './.env' });

// Router imports
const authRouter = require('./routes/auth');
const trackRouter = require('./routes/track');

// Initialize the application
const app = express();

// Middlewares initialization
app.use(morgan('dev'));
app.use(express.json());

// Database setup
const DB = process.env.DATABASE_URI;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection Successful!');
  })
  .catch((err) => {
    console.log(err);
  });

// Base Routes
app.use('/api', authRouter);
app.use('/api/tracks', trackRouter);

// Connecting to the server
const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
