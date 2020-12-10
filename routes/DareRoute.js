import express from 'express';
const server = express.Router();
import DareController from '../controllers/DareController';
import upload from '../middleware/upload';

server.get('/showAllDares', DareController.showAllDares);
server.post('/showSingleDare', DareController.showSingleDare);
server.post('/createDare', upload.single('image'), DareController.createDare);
server.post('/updatedDare', DareController.updateDare);
server.post('/deleteDare', DareController.deleteDare);

server.patch('/dares/:id/uploadmedia', (req, res) => {
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

module.exports = server;
