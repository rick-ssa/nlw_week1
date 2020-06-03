import express from 'express';
import routes from './routes';
import createDb from './database/create';

createDb.initiateDataBase('database.sqlite')

const app = express();

app.use(express.json())
app.use(routes)

app.listen(3333);