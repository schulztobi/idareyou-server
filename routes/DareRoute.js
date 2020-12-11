import express from 'express';
const server = express.Router();
import DareController from '../controllers/DareController';
import verifyToken from '../middleware/verifyToken';

server.get('/showAllDares', verifyToken, DareController.showAllDares);
server.get('/showSingleDare/:id', DareController.showSingleDareById);
server.post('/showSingleDare', DareController.showSingleDare);
server.post('/createDare', DareController.createDare);
server.post('/updatedDare', DareController.updateDare);
server.post('/deleteDare', DareController.deleteDare);
server.delete('/deleteDare/:id', DareController.deleteDareById);

module.exports = server;
