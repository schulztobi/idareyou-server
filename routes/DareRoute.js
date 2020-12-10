import express from 'express';
const server = express.Router();
import DareController from '../controllers/DareController';

server.get('/showAllDares', DareController.showAllDares);
server.post('/showSingleDare', DareController.showSingleDare);
server.post('/createDare', DareController.createDare);
server.post('/updatedDare', DareController.updateDare);
server.post('/deleteDare', DareController.deleteDare);

module.exports = server;
