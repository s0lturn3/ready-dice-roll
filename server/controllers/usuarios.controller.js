const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const { validatePayload, jwtMiddleware, initializeReturnModel } = require('../utils/middlewares/middlewares');
const usersDb = require('../db/users.db');

require('dotenv').config();
const JWTSecretKey = process.env.JWT_SECRET_KEY || 'bd3625a81c0826d40dab2b4d0b29d4ee7d2a812340c59827155ce2f9f4179d223ba95d97855c1bcd6b5f1ff22bdabee964bf8c56a17ee9765bd2822b70aa8f153fc5d42555842f15550f683e3962a32b63ff7ba513865ce046b0b66dedcc83dddf57c9e742c41b21455f13ad5ef4e1c5a626bec9323d540d153265899c9f6ab1';

const { ApiResponse } = require('../models/ApiResponse.model');


// #region GET

// ROUTE: api/users/jwttest
router.get('/jwttest', jwtMiddleware, async (req, res) => {
   const returnModel = req.returnModel;

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
router.get('/validateUsernameEmail', async (req, res) => {
   const returnModel = req.returnModel;
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

// ROUTE: api/users/login
router.post('/login', validatePayload, async (req, res) => {
   const returnModel = req.returnModel;
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
   const token = jwt.sign({ name: userWithoutPassword }, JWTSecretKey, { expiresIn: '15m' });
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

// ROUTE: api/users/signin
router.post('/signin', validatePayload, async (req, res) => {
   const returnModel = req.returnModel;
   const user = req.body;
   
   if (!user["username"] || !user["email"] || !user["senha"]) {
      returnModel.error = true;
      returnModel.errorMessage = 'Todos os campos são obrigatórios!';
      return res.status(400).json(returnModel);
   }
   
   try {
      const response = await usersDb.createUser(user);
      
      const userWithoutPassword = [...user['username'], user['email']];
      const token = jwt.sign({ name: userWithoutPassword }, JWTSecretKey, { expiresIn: '15m' });
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
// [...]
// #endregion PUT

// #region PATCH
// [...]
// #endregion PATCH

// #region DELETE
// [...]
// #endregion DELETE


module.exports = router;
