require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Test MongoDB connection endpoint
app.get('/test', (req, res) => {
  if (db.readyState === 1) {
    res.send('MongoDB connection is active');
  } else {
    res.status(500).send('MongoDB connection is not active');
  }
});

// Import routes
const todosRouter = require('./routes/todos');
const authRouter = require('./routes/auth');
const auth = require('./middleware/auth');

app.use('/todos', auth, todosRouter);
app.use('/auth', authRouter); // Use the auth router for authentication-related routes

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
