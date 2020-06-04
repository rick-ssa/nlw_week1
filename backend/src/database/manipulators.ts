import createDb from './create'

export default {
    getItems: (callback: Function)=>{
        let db = createDb.connect('database.sqlite')
        db.all('SELECT * FROM items', (err, rows)=>{
            if(err) throw {error: 'database error'}
            callback(rows)
        })
        db.close()
    },

    showItem: (id:number, callback: Function)=>{
        let db = createDb.connect('database.sqlite')

        db.get(`SELECT * FROM items WHERE id=?`,id,(err,row)=>{
            if(err) throw {error: 'database failure'}
            callback(row)
        })

        db.close()
    },

    addPoint: (data: any ,callback: Function) => {
        let db = createDb.connect('database.sqlite')

        let columnsNames = []
        let values = []
        let key;
        let {items} = data
        for(key in data) {
            if(key!=='items') {
                columnsNames.push(key)
                values.push(data[key])
            }
        }


        let columnsNamesString = columnsNames.join(',')

        let sqlPoints = `INSERT INTO points (${columnsNamesString}) `
        sqlPoints += 'VALUES (?, ?, ?, ?, ?, ?, ?, ?)'

        db.exec('BEGIN TRANSACTION');
        
        db.run(sqlPoints,values,function(err){

            if(err){
                db.exec('ROLLBACK')
                throw {error: 'database failure'}
            } 

            let point_id = this.lastID
            
            let placeholder = items.map((v:number)=>'(?,?)').join(',')

            let itemValues = []
            
            for(let i=0; i<items.length; i++){
                itemValues.push(point_id)
                itemValues.push(items[i])
            }

            let sqlPointItems = `INSERT INTO point_items (point_id, item_id) VALUES ${placeholder}`
            
            db.run(sqlPointItems,itemValues,(err)=>{
                if(err) {
                    db.run('ROLLBACK')
                    throw {error: 'database failure'}
                }
                callback({id: point_id, ...data})
                db.exec('COMMIT')
            })

        })
        
    },

    showPoint: (id:number, callback: Function)=>{
        let db = createDb.connect('database.sqlite') 

        db.serialize(()=>{
            let r;
            db.get(`SELECT * FROM points WHERE id = ?`, id, (err,row)=>{
                if(err) throw {error: 'database failure'}
    
                if(!row) return callback(undefined)

                let sqlItems = 'SELECT i.* FROM point_items as pi '
                sqlItems += 'INNER JOIN items as i on i.id = pi.item_id WHERE point_id = ?'

                db.all(sqlItems, id, (err,items)=>{
                    if (err) return console.log(err)

                    getItems(items)
                })

                function getItems (items:any) {
                    callback({point:row,items})
                }
                
            })

        })
    }
}