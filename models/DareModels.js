import mongoose from 'mongoose';

const Dare = new mongoose.Schema({
  headline: { type: String, required: true },
  infotext: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
});

module.exports = mongoose.model('idareyou/dares', Dare);
