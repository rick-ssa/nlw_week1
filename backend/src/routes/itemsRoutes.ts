import express from 'express';
import ItemsControllers from '../controllers/itemsControllers'
const routes = express.Router();

const itemsControllers = new ItemsControllers

routes.get('/',itemsControllers.index)
routes.get('/:id',itemsControllers.show)



export default routes;