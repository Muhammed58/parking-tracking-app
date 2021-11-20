import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) =>{
    res.send('app runningg....')
})

app.use('/users', router);


mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.messagers));
