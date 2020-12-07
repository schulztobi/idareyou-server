import Dare from '../models/DareModels';
import express from 'express';

const server = express.Router();

server.get('/dares', (req, res) => {
  Dare.find().then((dares) => res.json(dares));
});

server.get('/dares/:id', (req, res) => {
  const { id } = req.params;
  Dare.find({ _id: id }).then((dares) => res.json(dares));
});

server.post('/dares', (req, res) => {
  const newDare = req.body;
  const dare = new Dare(newDare);
  dare.save().then((dare) => res.json(dare));
});

server.delete('/dares/:id', (req, res) => {
  const { id } = req.params;
  Dare.findByIdAndRemove({ _id: id }).then((dare) => res.json(dare));
});

module.exports = server;
