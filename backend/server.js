import cors from 'cors';
import dotnev from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

dotnev.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json({ limit: 'smb' }));
app.use(morgan('dev'));


app.get('/', (req, res) => {

    res.json({ message: "api runing" })

});

app.use('/api/auth', authRoutes);


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT, () =>
            console.log(`Server running on port ${process.env.PORT}`)
        );
    })
    .catch((err) => console.error(err));




