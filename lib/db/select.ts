import { db } from "./conn";

const select = async (callback) => {  
  db.all(`SELECT * FROM trades`, (err:any, results:object):void|object => {
    if (err) { return console.error(err.message); }    
    callback(results);    
  });
}

export default select;