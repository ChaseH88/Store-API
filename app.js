// Express
const express = require("express");
const app = express();

// Config
const dotenv = require("dotenv");
dotenv.config({ path: './config/config.env' });

const _PORT = process.env.PORT || 6000;

app.get("/", (req, res) => {
  res.send("HOME")
});


app.listen(_PORT, () => {
  console.clear();
  console.log(`===============================\nServer has started on port ${_PORT}\nMode: ${process.env.NODE_ENV}\n===============================`);
});