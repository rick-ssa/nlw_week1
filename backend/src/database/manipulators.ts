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

    addPoint: async (data: any ,callback: Function) => {
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
            console.log(itemValues)
            let sqlPointItems = `INSERT INTO point_items (point_id, item_id) VALUES ${placeholder}`
            
            db.run(sqlPointItems,itemValues,(err)=>{
                if(err) {
                    db.run('ROLLBACK')
                    throw {error: err}
                }
                callback({id: point_id, ...data})
                db.exec('COMMIT')
            })

        })
    }
}