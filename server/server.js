const express = require('express');
const cors = require('cors');  // Importa o CORS
//const db = require('./db/db'); // Importa as funções de `db.js`
const usersDb = require('./db/users'); // Importa as funções de `db.js`

const app = express();
const port = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Habilita o CORS globalmente (permitindo requisições de qualquer origem)
app.use(cors());  // Permitindo todas as origens


// #region ENDPOINTS

// USUARIOS
// Endpoint para validar se existe email na base
app.get('/api/users/validateUsernameEmail', async (req, res) => {
  const username_email = req.query.username_email;
  
  console.log("req.query: ", req.query);
  console.log("req.query.username_email: ", req.query.username_email);
  

  if (!username_email) {
    return res.status(400).json({ error: 'Você deve informar um usuário ou e-mail para validar!' });
  }

  try {
    const response = await usersDb.validateUsernameEmail(username_email);
    res.status(200).json(response);
  }
  catch (err) {
    console.error('Erro ao buscar a informação na base:', err.message);
    res.status(500).json({ error: 'Ocorreu um erro ao procurar pelo usuário/e-mail.' });
  }
});

// Endpoint para validar login
app.get('/api/users/validateLogin', async (req, res) => {
  const username_email = req.query.username_email;
  const password = req.query.password;  

  if (!username_email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  try {
    const response = await usersDb.validateLogin(username_email, password);
    res.status(200).json(response);
  }
  catch (err) {
    console.error('Erro ao fazer login:', err.message);
    res.status(500).json({ error: 'Ocorreu um erro ao realizar login...' });
  }
});

// #endregion ENDPOINTS

// Endpoint para criar um usuário
app.post('/api/users/create', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  try {
    const result = await usersDb.createUser(username, email, password);
    res.status(201).json({ message: 'Usuário criado com sucesso.', id: result.id });
  } catch (err) {
    console.error('Erro ao criar usuário:', err.message);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

// Endpoint para buscar todos os usuários
app.get('/api/users', async (req, res) => {
  console.log("entrou na api");
  
  try {
    const users = await usersDb.getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err.message);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

// Inicializando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Fechando a conexão ao encerrar o servidor (opcional)
process.on('SIGINT', () => {
  usersDb.closeConnection();
  process.exit(0);
});
