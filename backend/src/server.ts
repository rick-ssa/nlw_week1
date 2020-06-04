import express from 'express';
import itemsRoutes from './routes/itemsRoutes';
import pointsRoutes from './routes/pointsRoutes';
import createDb from './database/create';
import path from 'path';
import cors from 'cors';

createDb.initiateDataBase('database.sqlite');

const app = express();

app.use(cors())
app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads')))
app.use(express.json())
app.use('/items',itemsRoutes)
app.use('/points',pointsRoutes)

app.listen(3333);