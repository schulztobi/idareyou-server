import mongoose from 'mongoose';
import express from 'express';
import fileUpload from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
const cors = require('cors');
import AuthRoute from './routes/auth';
import DareRoute from './routes/DareRoute';
import Dare from './models/Dare';
const mongoURI =
  'mongodb+srv://admin:12345@project0.n3r4a.mongodb.net/idareyou?retryWrites=true&w=majority';

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

// // const User = mongoose.model('User', {
// //   userName: {
// //     type: String,
// //     required: true,
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //   },
// //   password: {
// //     type: String,
// //     required: true,
// //   },
// // });

// // server.post('/createNewUser', (req, res) => {
// //   const newUser = req.body;
// //   const user = new User(newUser);
// //   user.save().then((user) => res.json(user));
// // });

// // server.get('/login', (req, res) => {
// //   User.find().then((user) => res.json(user));
// // });

// const Dare = mongoose.model('Dare', {
//   headline: String,
//   infotext: String,
//   fileName: String,
//   filePath: String,
//   daredUser: String,
// });

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

// server.get('/dares', (req, res) => {
//   Dare.find().then((dares) => res.json(dares));
// });

// server.get('/dares/:id', (req, res) => {
//   const { id } = req.params;
//   Dare.find({ _id: id }).then((dares) => res.json(dares));
// });

// server.post('/dares', (req, res) => {
//   const newDare = req.body;
//   const dare = new Dare(newDare);
//   dare.save().then((dare) => res.json(dare));
// });

// server.delete('/dares/:id', (req, res) => {
//   const { id } = req.params;
//   Dare.findByIdAndRemove({ _id: id }).then((dare) => res.json(dare));
// });

const port = 4000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
