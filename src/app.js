const express = require('express');
const authRoutes = require('./interfaces/routes/authRoutes');
const pokemonRoutes = require('./interfaces/routes/pokemonRoutes');
const { authenticateToken } = require('./infrastructure/AuthService'); 
const connectDB = require('./infrastructure/database'); 

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/pokemon', authenticateToken, pokemonRoutes);

module.exports = app;
