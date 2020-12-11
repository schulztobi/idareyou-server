import mongoose from 'mongoose';
import express from 'express';
import fileUpload from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
const cors = require('cors');
import AuthRoute from './routes/auth';
import DareRoute from './routes/DareRoute';
import UserRoute from './routes/UserRoute';
import Dare from './models/Dare';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.DATABASE_ACCESS;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const server = express();
server.use(express.json());
server.use(cors());
server.use(fileUpload());
server.use('/app', AuthRoute);
server.use('/app', DareRoute);
server.use('/app', UserRoute);

//File Upload

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

//Modify fileName and filePath of Dare

server.patch('/dares/:id', (req, res) => {
  const { id } = req.params;
  const updatedDare = req.body;
  Dare.findByIdAndUpdate({ _id: id }, updatedDare, { new: true })
    .then((myNewData) => res.json(myNewData))
    .catch((error) => {
      console.error(error);
      res.json({ error: 'an unexpected error occured' });
    });
});

const port = 4000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
