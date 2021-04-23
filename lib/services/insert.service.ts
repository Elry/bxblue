import { db } from "./conn.service";

const insert = (users:Record<string, unknown>, pokemons:Record<string, unknown>, status:string):void => {
  const query = `INSERT INTO trades(user1, user2, user1_pokemons, user2_pokemons, status) VALUES(?, ?, ?, ?, ?)`;

  const user1Pokemons = JSON.stringify(pokemons[0]);
  const user2Pokemons = JSON.stringify(pokemons[1]);

  db.run(query, [users[0], users[1], user1Pokemons, user2Pokemons, status], (err:any):void => {
    if (err) { return console.log(err.message); }
    console.log("Inserted");
  });
}

export default insert;