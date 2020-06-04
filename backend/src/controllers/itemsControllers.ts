import {Request, Response} from 'express';
import  dbManipulators from '../database/manipulators'

class ItemsControllers {
    index = (request: Request, response: Response) => {
        dbManipulators.getItems((rows:Array<any>)=>{
            const serializedItems = rows.map(row=>{
                return {...row, image: `http://localhost:3333/uploads/${row.image}`}
            })
            return response.json(serializedItems)
        })
    }
}

export default ItemsControllers