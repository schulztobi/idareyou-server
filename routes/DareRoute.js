import express from 'express';
const server = express.Router();
import DareController from '../controllers/DareController';
import verifyToken from '../middleware/verifyToken';

server.get('/showAllDares', verifyToken, DareController.showAllDares);
server.get(
  '/showSingleDare/:id',
  verifyToken,
  DareController.showSingleDareById
);
server.get(
  '/createdDaresByUser',
  verifyToken,
  DareController.createdDaresByUser
);
server.get(
  '/showAllDaresToUser',
  verifyToken,
  DareController.showAllDaresToUser
);
server.post('/showSingleDare', verifyToken, DareController.showSingleDare);
server.post('/createDare', verifyToken, DareController.createDare);
server.post('/updatedDare', verifyToken, DareController.updateDare);
server.post('/deleteDare', verifyToken, DareController.deleteDare);
server.delete('/deleteDare/:id', verifyToken, DareController.deleteDareById);

module.exports = server;
