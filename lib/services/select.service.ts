import { db } from "./conn.service";

const select = async (callback:(res:Record<string, unknown>) => void ):Promise<void> => {
  db.all(`SELECT * FROM trades`, (err:any, results:Record<string, unknown>):void|Record<string, unknown> => {
    if (err) { return console.error(err.message); }    
    callback(results);    
  });
}

export default select;