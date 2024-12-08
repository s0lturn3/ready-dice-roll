// #region CONFIGURAÇÕES INICIAIS
const express = require('express');
const cors = require('cors');  // Importa o CORS
const jwt = require('jsonwebtoken');

const usersDb = require('./db/users'); // Importa as funções de `users.js`

const app = express();
const port = 3000;

const JWTSecretKey = 'bd3625a81c0826d40dab2b4d0b29d4ee7d2a812340c59827155ce2f9f4179d223ba95d97855c1bcd6b5f1ff22bdabee964bf8c56a17ee9765bd2822b70aa8f153fc5d42555842f15550f683e3962a32b63ff7ba513865ce046b0b66dedcc83dddf57c9e742c41b21455f13ad5ef4e1c5a626bec9323d540d153265899c9f6ab1';

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Habilita o CORS globalmente (permitindo requisições de qualquer origem)
app.use(cors());  // Permitindo todas as origens (mudará quando for publicado)
// #endregion CONFIGURAÇÕES INICIAIS


// #region UTILS
class ApiResponse {
  error = false;
  errorMessage = null;
  body = null;
  metadata = null;
}


/** Valida se o token está válido para chamadas que exigem autenticação */
const jwtMiddleware = (req, res, next) => {
  const returnModel = new ApiResponse();
  const authString = req.headers['authorization'];

  if (typeof authString === 'string' && authString.indexOf(' ') > -1) {
    const authArray = authString.split(' ');
    const token = authArray[1];

    jwt.verify(token, JWTSecretKey, (err, decoded) => {
      if (err) {
        returnModel.error = true;
        returnModel.errorMessage = 'Ocorreu um erro na autenticação.';
        returnModel.body = err;

        res.status(403).send(returnModel);
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    returnModel.error = true;
    returnModel.errorMessage = 'Ação não permitida para usuário não logado.';

    return res.status(403).send(returnModel);
  }
};


/** Valida se a requisição possui corpo válido */
const validatePayload = (req, res, next) => {
  const returnModel = new ApiResponse();

  if (!req.body) {
    returnModel.error = true;
    returnModel.errorMessage = 'Corpo da requisição não encontrado!';

    return res.status(403).send(returnModel);
  }

  return next();
};
// #endregion UTILS


// #region ENDPOINTS

// #region USUARIOS

// #region GET

// ROUTE: api/users/jwttest
app.get('/api/users/jwttest', jwtMiddleware, async (req, res) => {
  let returnModel = new ApiResponse();

  try {
    returnModel.body = 'Deu bom o token!';
    res.status(200).json(returnModel);
  }
  catch (err) {
    returnModel.error = true;
    returnModel.errorMessage = 'Ocorreu um erro ao procurar pelo usuário/e-mail.';
    res.status(500).json(returnModel);
  }
});



// ROUTE: api/users/validateUsernameEmail
app.get('/api/users/validateUsernameEmail', async (req, res) => {
  let returnModel = new ApiResponse();
  const username_email = req.query.username_email;
  
  if (!username_email) {
    returnModel.error = true;
    returnModel.errorMessage = 'Você deve informar um usuário ou e-mail para validar!';
    
    return res.status(400).json(returnModel);
  }
  
  try {
    const response = await usersDb.validateUsernameEmail(username_email);
    
    if (Array.isArray(response) && response.length === 0) {
      returnModel.body = { newUser: true };
      return res.status(200).json(returnModel);
    }
    
    returnModel.body = { newUser: false };
    return res.status(200).json(returnModel);
  }
  catch (err) {
    returnModel.error = true;
    returnModel.errorMessage = 'Ocorreu um erro ao procurar pelo usuário/e-mail.';
    res.status(500).json(returnModel);
  }
});
// #endregion GET

// #region POST

// ROUTE: api/users/validateLogin
app.post('/api/users/validateLogin', validatePayload, async (req, res) => {
  let returnModel = new ApiResponse();
  
  const userForm = req.body;
  
  if (!userForm.usernameOrEmail || !userForm.password) {
    returnModel.error = true;
    returnModel.errorMessage = 'Todos os campos são obrigatórios!';
    return res.status(400).json(returnModel);
  }
  
  try {
    const response = await usersDb.validateLogin(userForm.usernameOrEmail, userForm.password);
    
    if (!response) {
      returnModel.error = true;
      returnModel.errorMessage = 'Credenciais incorretas!';
      return res.status(404).json(returnModel);
    }
    
    const userWithoutPassword = userForm['usernameOrEmail'];
    const token = jwt.sign({ name: userWithoutPassword }, JWTSecretKey, { expiresIn: 15 });
    returnModel.body = {
      user: userWithoutPassword,
      token: token
    };

    await usersDb.updateLastLogin(response?.Id);
    return res.status(200).json(returnModel);
  }
  catch (err) {
    returnModel.error = true;
    returnModel.errorMessage = `Ocorreu um erro ao realizar login: ${err}`;
    res.status(500).json(returnModel);
  }
});

// ROUTE: api/users/
app.post('/api/users', validatePayload, async (req, res) => {
  let returnModel = new ApiResponse();
  const user = req.body;
  
  if (!user["username"] || !user["email"] || !user["senha"]) {
    returnModel.error = true;
    returnModel.errorMessage = 'Todos os campos são obrigatórios!';
    return res.status(400).json(returnModel);
  }
  
  try {
    const response = await usersDb.createUser(user);
    
    const userWithoutPassword = [...user['username'], user['email']];
    const token = jwt.sign({ name: userWithoutPassword }, JWTSecretKey, { expiresIn: 15 });
    returnModel.body = {
      user: userWithoutPassword,
      token: token
    };
    
    await usersDb.updateLastLogin(response.id);
    return res.status(200).json(returnModel);
  }
  catch (err) {
    returnModel.error = true;
    returnModel.errorMessage = 'Ocorreu um erro ao realizar o seu registro. Tente novamente mais tarde!';
    res.status(500).json(returnModel);
  }
});
// #endregion POST

// #region PUT

// #endregion PUT

// #region DELETE

// #endregion DELETE

// #endregion USUARIOS

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
