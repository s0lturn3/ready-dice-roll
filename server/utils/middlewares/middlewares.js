const jwt = require('jsonwebtoken');
const express = require('express');

const exp = express();

require('dotenv').config();
const JWTSecretKey = process.env.JWT_SECRET_KEY || 'bd3625a81c0826d40dab2b4d0b29d4ee7d2a812340c59827155ce2f9f4179d223ba95d97855c1bcd6b5f1ff22bdabee964bf8c56a17ee9765bd2822b70aa8f153fc5d42555842f15550f683e3962a32b63ff7ba513865ce046b0b66dedcc83dddf57c9e742c41b21455f13ad5ef4e1c5a626bec9323d540d153265899c9f6ab1';

const { ApiResponse } = require('../../models/ApiResponse.model');


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

/** Inicializa a estrutura de retorno padronizada */
const initializeReturnModel = (req, res, next) => {
  req.returnModel = new ApiResponse();
  next();
};

module.exports = {
   validatePayload,
   jwtMiddleware,
   initializeReturnModel
};