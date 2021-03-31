import sqlite3 from "sqlite3";

const sql = sqlite3.verbose();

export const db = new sql.Database('poke.db', sql.OPEN_READWRITE, (err:any):void => {
  if(err){ return console.log(err.message); }
  
  console.log("Connected to in-memory storage");
});