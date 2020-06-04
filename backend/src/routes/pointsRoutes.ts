import express from 'express';
import PointsControllers from '../controllers/pointsControllers'
const routes = express.Router();

const pointsControllers = new PointsControllers

routes.post('/',pointsControllers.create)
routes.get('/:id',pointsControllers.show)

export default routes;