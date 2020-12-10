import express from 'express';
const server = express.Router();
import AuthController from '../controllers/AuthController';

server.post('/register', AuthController.register);
server.post('/login', AuthController.login);

module.exports = server;
