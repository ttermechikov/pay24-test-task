const express = require('express');
require('dotenv').config(); // setting up environment variables

const db = require('./db');

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.end('It works');
});

app.listen(PORT, () => {
  console.log(`API launched on port '${PORT}'`);
});
