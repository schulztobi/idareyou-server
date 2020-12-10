import mongoose, { mongo } from 'mongoose';

const dareSchema = new mongoose.Schema({
  headline: {
    type: String,
  },
  infotext: {
    type: String,
  },
  fileName: {
    type: String,
  },
  filePath: {
    type: String,
  },
  image: {
    type: String,
  },
  daredUser: {
    type: String,
  },
});

const Dare = mongoose.model('Dare', dareSchema);

module.exports = Dare;
