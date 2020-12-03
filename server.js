import mongoose from 'mongoose';
import express from 'express';
import fileUpload from 'express-fileupload';
const cors = require('cors');

mongoose.connect(
  'mongodb+srv://admin:12345@project0.n3r4a.mongodb.net/idareyou?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const server = express();
server.use(express.json());
server.use(cors());
server.use(fileUpload());

server.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  } else {
    const file = req.files.file;

    file.mv(
      `/Users/tobiasschulz/Development/neuefische/muc-2020-w1/idareyou-project/idareyou-app/src/uploads/${file.name}`,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `./uploads/${file.name}` });
      }
    );
  }
});

const Dare = mongoose.model('Dare', { headline: String, infotext: String });

server.get('/dares', (req, res) => {
  Dare.find().then((dares) => res.json(dares));
});

server.get('/dares/:id', (req, res) => {
  const { id } = req.params;
  Dare.find({ _id: id }).then((dares) => res.json(dares));
});

server.post('/dares', (req, res) => {
  const newDare = req.body;
  console.log(newDare);
  const dare = new Dare(newDare);
  dare.save().then((dare) => res.json(dare));
});

server.delete('/dares/:id', (req, res) => {
  const { id } = req.params;
  Dare.findByIdAndRemove({ _id: id }).then((dare) => res.json(dare));
});

const port = 4000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
