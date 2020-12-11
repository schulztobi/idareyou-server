import express from 'express';
const server = express.Router();
import UserController from '../controllers/UserController';
import verifyToken from '../middleware/verifyToken';

server.get('/user', verifyToken, UserController.showAllUser);
server.get('/user/:id', verifyToken, UserController.showSingleUser);

module.exports = server;
