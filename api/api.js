require('dotenv').config(); // setting up environment variables

const express = require('express');
const cors = require('cors');

const db = require('./db');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/admin', routes.adminRoutes);
app.use('/api/notes', routes.notesRoutes);

app.listen(PORT, () => {
  console.log(`API launched on port '${PORT}'`);
});
