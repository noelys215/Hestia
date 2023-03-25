import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import colors from 'colors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import adRoutes from './routes/ad.js';

dotenv.config();

const PORT = 8000;
const MONGODB = process.env.DATABASE;
const app = express();

/* Database */
mongoose.set('strictQuery', false);

mongoose.connect(MONGODB, () => console.log('MongoDB Connected'.bgBrightYellow));

/* Middleware */
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use(cors());

/* Routes */
app.use('/api', authRoutes);
app.use('/api', adRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`.bgBrightMagenta));
