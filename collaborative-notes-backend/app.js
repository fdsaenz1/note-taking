// app.js
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
