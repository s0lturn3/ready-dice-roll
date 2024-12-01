const express = require('express');
const router = express.Router();
const client = require('../db/db');

// Endpoint para buscar todos os usuários
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM USUARIO');
    res.json(result.rows); // Retorna os usuários em formato JSON
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

module.exports = router;
