import Dare from '../models/DareModels';
import express from 'express';
import fileUpload from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
const server = express.Router();
server.use(fileUpload());

server.patch('/:id/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  } else {
    const file = req.files.file;
    const v4options = uuidv4();

    file.mv(
      `/Users/tobiasschulz/Development/neuefische/muc-2020-w1/idareyou-project/idareyou-app/public/uploads/${v4options}_${file.name}`,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }

        res.json({
          fileName: file.name,
          filePath: `/uploads/${v4options}_${file.name}`,
        });
      }
    );
  }
});

server.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updatedDare = req.body;
  Dare.findByIdAndUpdate({ _id: id }, updatedDare, { new: true })
    .then((myNewData) => res.json(myNewData))
    .catch((error) => {
      console.error(error);
      res.json({ error: 'an unexpected error occured' });
    });
});

module.exports = server;
