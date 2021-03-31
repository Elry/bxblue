import { db } from "./conn";

const insert = (val:object) => {
  db.run(`INSERT INTO trades(user1, user2) VALUES(?, ?)`, [val[0], val[1]], (err:any):void => {
    if (err) { return console.log(err.message); }
    console.log("Inserted");
  });
}

export default insert;