import express from 'express';
import SignUpModels from '../models/SignUpModels';
const server = express.Router();

server.post('/signup', (req, res) => {
  const signedUpUser = new SignUpModels({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  signedUpUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = server;
