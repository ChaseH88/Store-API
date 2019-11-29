require("dotenv").config({ path: './config/config.env' }); // environment variables

//============= STORE API =============
const express = require("express");
const app = express();
const path = require("path");
const logger = require('./middleware/logger');
const errorHandler = require("./middleware/error");
const morgan = require('morgan');
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const cors = require('cors');

// Config
const connectDB = require("./config/db"); // database Connection
const _PORT = process.env.PORT || 6000; // port that the server is running on

// connect to the database
connectDB();

// Middlewares
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(fileupload());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const user_route = require("./routes/users");
const location_route = require("./routes/locations");
const product_route = require("./routes/products");
const image_route = require("./routes/images");
const auth_route = require("./routes/auth");
const site_route = require("./routes/site");

// Request Logger
process.env.NODE_ENV === 'development' && ((() => {
  //app.use(logger);
  app.use(morgan('dev'));
})());

// Use Routes
app.use(`/api/users`, user_route);
app.use(`/api/user/account`, auth_route);
app.use(`/api/locations`, location_route);
app.use(`/api/products`, product_route);
app.use(`/api/images`, image_route);
app.use(`/api/site`, site_route);

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