// #region CONFIGURAÇÕES INICIAIS
const express = require('express');
const cors = require('cors');

const usersDb = require('./db/users.db'); // Importa as funções de `users.js`

const app = express();
const port = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Habilita o CORS
app.use(cors({
  origin: ['http://localhost:4200'], // URLs permitidas
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// #endregion CONFIGURAÇÕES INICIAIS


// #region UTILS

// Middleware global
const { initializeReturnModel } = require('./utils/middlewares/middlewares');
app.use(initializeReturnModel);

// const { validatePayload, jwtMiddleware } = require('../middlewares');
// const { ApiResponse } = require('./models/api-response');

// #endregion UTILS


// #region ENDPOINTS
const userRoutes = require('./controllers/usuarios.controller');
app.use('/api/users', userRoutes);
// #endregion ENDPOINTS


// Inicializando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Fechando a conexão ao encerrar o servidor (opcional)
process.on('SIGINT', () => {
  usersDb.closeConnection();
  process.exit(0);
});
