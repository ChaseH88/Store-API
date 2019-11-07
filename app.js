require("dotenv").config({ path: './config/config.env' }); // environment variables

//============= STORE API =============
const express = require("express");
const app = express();
const logger = require('./middleware/logger');
const errorHandler = require("./middleware/error");
const morgan = require('morgan');

// Config
const connectDB = require("./config/db"); // database Connection
const _PORT = process.env.PORT || 6000; // port that the server is running on

// connect to the database
connectDB();

// body parser
app.use(express.json());

// Routes
const user_route = require("./routes/users");
const location_route = require("./routes/locations");
const product_route = require("./routes/products");

// Request Logger
process.env.NODE_ENV === 'development' && ((() => {
  //app.use(logger);
  app.use(morgan('dev'));
})());

// Use Routes
app.use(`/api/users`, user_route);
app.use(`/api/locations`, location_route);
app.use(`/api/products`, product_route);

// Other Middleware
app.use(errorHandler);

// Listener
const server = app.listen(_PORT, () => {
  console.log(`
===============================
Server has started on port ${_PORT}
Mode: ${process.env.NODE_ENV}
===============================
  `);
});


process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});