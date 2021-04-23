import { db } from "./conn.service";

const select = async (callback:(res:object) => void ) => {  
  db.all(`SELECT * FROM trades`, (err:any, results:object):void|object => {
    if (err) { return console.error(err.message); }    
    callback(results);    
  });
}

export default select;