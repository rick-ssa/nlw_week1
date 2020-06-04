import express from 'express';
import PointsControllers from '../controllers/pointsControllers'
const routes = express.Router();

const pointsControllers = new PointsControllers

routes.post('/',pointsControllers.create)


export default routes;