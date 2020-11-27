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

const dare = mongoose.model('Dare', { headline: String, infotext: String });

server.get('/', (request,response) => {
    response.json({status : 'alive'});
});










const port = 4000;

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})