// Express
const express = require("express");
const app = express();
const { logger } = require('./utilities/logger');

// Config
const dotenv = require("dotenv");
dotenv.config({ path: './config/config.env' }); // environment variables
const _PORT = process.env.PORT || 6000; // port that the server is running on

// Log to file utility
app.use(logger);

// Routes
const user_route = require("./routes/users");

// Use Routes
const version = `/api/${process.env.API_VERSION || 'v1'}`;
app.use(`${version}/users`, user_route); //: /api/v1/users

// Listener
app.listen(_PORT, () => {
  console.clear();
  console.log(`
    ===============================
    Server has started on port ${_PORT}
    Mode: ${process.env.NODE_ENV}
    ===============================
  `);
});