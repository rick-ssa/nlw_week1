import path from 'path';
import {Database} from 'sqlite3'

const sqlite3 = require('sqlite3').verbose();

const connect = function(dbName: string) {
    let db = new sqlite3.Database(path.resolve(__dirname,dbName))

    return db
}

const createTablePoints = (db: Database)=> {
    let sql = 'CREATE TABLE IF NOT EXISTS points ('
        sql += 'image TEXT NOT NULL,'
        sql += 'name TEXT NOT NULL,'
        sql += 'email TEXT NOT NULL,'
        sql += 'whatsapp TEXT NOT NULL,'
        sql += 'latitude TEXT NOT NULL,'
        sql += 'longitude TEXT NOT NULL,'
        sql += 'city TEXT NOT NULL,'
        sql += 'uf TEXT(2) NOT NULL'
        sql += ')'
    
        
    db.run(sql,(err: any)=>err && console.log(err))
            
}

const createTableItems = (db: Database)=> {
    let sql = 'CREATE TABLE IF NOT EXISTS items ('
        sql += 'image TEXT NOT NULL,'
        sql += 'title TEXT NOT NULL'
        sql += ')'        
    db.run(sql,(err: any)=>err && console.log(err))           
}

const createTablePointItems = (db: Database)=> {
    let sql = 'CREATE TABLE IF NOT EXISTS point_items ('
        sql += 'point_id INTEGER NOT NULL,'
        sql += 'item_id INTEGER NOT NULL,'
        sql += 'FOREIGN KEY (point_id) REFERENCES points (rowid),'
        sql += 'FOREIGN KEY (item_id) REFERENCES items (rowid)'
        sql += ')'        
    db.run(sql,(err: any)=>err && console.log(err))           
}

const initiateDataBase = async (dbName: string) => {
    let db = await connect(dbName);
    createTablePoints(db);
    createTableItems(db);
    createTablePointItems(db);
    db.close()
}

export default {createTablePoints, connect, initiateDataBase}
