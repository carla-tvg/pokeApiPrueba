const express = require('express');
const PokemonController = require('../controllers/PokemonController');
const { authenticateToken } = require('../../infrastructure/AuthService');

const router = express.Router();

router.post('/add', authenticateToken, PokemonController.add);
router.get('/inventory', authenticateToken, PokemonController.inventory);

module.exports = router;
