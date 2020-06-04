import {Request, Response} from 'express';  
import  dbManipulators from '../database/manipulators'

class PointsControllers {
    create = (request: Request, response: Response) => {
        dbManipulators.addPoint(request.body,(point:any)=>{
            response.json(point)
        })
    }
}

export default PointsControllers

