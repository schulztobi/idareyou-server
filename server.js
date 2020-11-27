import mongoose from 'mongoose';
import express from 'express';

mongoose.connect('mongodb://localhost:27017/idareyou', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

// Express server for routing, logic
const server = express();
server.use(express.json());

const Dare = mongoose.model('Dare', { headline: String, infotext: String });

server.get('/dares', (req,res) => {
    Dare.find().then((dares => res.json(dares)))
});

server.get('/dares/:id', (req,res) => {
    const { id } = req.params;
    Dare.find({_id:id}).then((dares => res.json(dares)))
});

server.post('/dares', (req, res) => {
    const newDare = req.body;
    const dare = new Dare(newDare);
    dare.save().then((dare)=> res.json(dare))
});

server.delete('/dares/:id', (req,res) => {
    const { id } = req.params;
    Dare.findByIdAndRemove({ _id:id}).then((dare) => res.json(dare))
});

const port = 4000;

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})