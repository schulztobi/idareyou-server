import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import SignUpRoutes from './routes/SignUpRoutes';
import FileUploadRoute from './routes/FileUploadRoute';
import DareRoute from './routes/DareRoute';
import cors from 'cors';
dotenv.config();

mongoose.connect(
  process.env.DATABASE_ACCESS,
  () => console.log('Database connected'),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const server = express();
server.use(express.json());
server.use(cors());
server.use('/app', SignUpRoutes);
server.use('/app', FileUploadRoute);
server.use('/app', DareRoute);

const port = 4000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
