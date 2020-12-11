import express from 'express';
const server = express.Router();
import UserController from '../controllers/UserController';

server.get('/user', UserController.showAllUser);
server.get('/user/:id', UserController.showSingleUser);

module.exports = server;
