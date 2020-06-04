import {Request, Response} from 'express';  
import  dbManipulators from '../database/manipulators'

class PointsControllers {
    create = (request: Request, response: Response) => {
        dbManipulators.addPoint(request.body,(point:any)=>{
            response.json(point)
        })
    }

    show = (request:Request, response: Response) =>{
        dbManipulators.showPoint(Number(request.params.id),(row:any)=>{
            if(!row) return response.sendStatus(404)
            return response.json(row)
        })
    }
}

export default PointsControllers

