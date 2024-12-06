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

  if (!username_email) {
    return res.status(400).json({ error: 'Você deve informar um usuário ou e-mail para validar!' });
  }

  try {
    const response = await usersDb.validateUsernameEmail(username_email);

    if (Array.isArray(response) && response.length === 0) {
      return res.status(200).json({ newUser: true });
    }
    
    return res.status(200).json(response);
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
    
    if (Array.isArray(response) && response.length === 0) {
      return res.status(404).json({ error: "Credenciais incorretas!" });
    }

    await usersDb.updateLastLogin(response[0].Id);
    return res.status(200).json(response);
  }
  catch (err) {
    console.error('Erro ao fazer login:', err.message);
    res.status(500).json({ error: 'Ocorreu um erro ao realizar login...' });
  }
});


// Endpoint para criar um usuário
app.post('/api/users', async (req, res) => {
  const user = req.body;

  if (!user["username"] || !user["email"] || !user["senha"]) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  try {
    const response = await usersDb.createUser(user);

    console.log(response);
    
    await usersDb.updateLastLogin(response.id);
    return res.status(200).json(response);
  }
  catch (err) {
    console.error('Erro ao criar conta do usuário:', err.message);
    res.status(500).json({ error: 'Ocorreu um erro ao realizar o seu registro.' });
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

// Inicializando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Fechando a conexão ao encerrar o servidor (opcional)
process.on('SIGINT', () => {
  usersDb.closeConnection();
  process.exit(0);
});
