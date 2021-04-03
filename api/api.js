const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.end('It works');
});

app.listen(PORT, () => {
  console.log(`API is started working on ${PORT}`);
});
