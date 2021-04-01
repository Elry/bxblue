import axios from "axios";
import dotenv from "dotenv";
import insert from "./db/insert";
import select from "./db/select";
import express, {Request, Response, NextFunction} from "express";

dotenv.config();

const app = express();

// home
app.get("/", (req:Request, res:Response) => res.status(200).json("Bxblue pokemon calculator challenge"));

app.use(express.json());

// get err
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  if(err){
    res.status(err.status || 500)
    .type("json")
    .send(err.message || "server error");
  }
});

// listener
app.listen(process.env.PORT, () => {
  console.log(`Running at https://${process.env.HOSTNAME}:${process.env.PORT}`);
});

app.get("/v1/trade/list", (req:Request, res:Response):void => {  
  select((e:any):void => {
    console.log(e);
    res.status(200).json(e);
  });  
});

// main
app.post("/v1/trade/check", async (req:Request, res:Response):Promise<void> => {

  // variables to use as example in case none is given
  const p1Ex:object = [
    {"id": 1},
    {"id": 2}
  ];
  
  const p2Ex:object = [
    {"id": 3},
    {"id": 4}
  ];

  const user1:string = req.body.users.p1.name ? req.body.users.p1.name : "p1";
  const user2:string = req.body.users.p2.name ? req.body.users.p2.name : "p2";
  const p1:object[] = req.body.users.p1.pokemons ? req.body.users.p1.pokemons : p1Ex;  
  const p2:object[] = req.body.users.p2.pokemons ? req.body.users.p2.pokemons : p2Ex;

  try{
    let p1Check:string = checkSize(p1, "p1");
    let p2Check:string = checkSize(p2, "p2");  
    
    // checking size between 1 and 6
    if(p1Check || p2Check){
      res.status(400).json(p1Check + " " + p2Check);
      return;
    }
  
    let fair:string = await checkFairness(p1, p2);

    if(fair){
      insert([user1, user2], [p1, p2], fair);
      res.status(200).json(fair);
    }
    else{ throw 0; }
  }catch(err:any){
    res.status(500).json(`Error: ${err}`);
  }
});

const checkSize = (obj:object[], name:string):string => {
  if(obj.length < 1){
    return `${name} must provide at least one pokemon`;
  }else if(obj.length > 6){
    return `${name} must provide a maximum of 6 pokemons`
  }
  return "";
}

// get base experience
const getBaseExp = async (id:number):Promise<number> => {
  const resp = await axios.get(`https://${process.env.POKEURI}` + id);
  return resp.data.base_experience;
}

const sumValues = async (val:object):Promise<number> => {
  let sum:number = 0;  
  
  for(let i in val){
    sum += await getBaseExp(val[i].id);
  }

  return sum;
}

const checkFairness = async (p1:Object, p2:Object):Promise<string> => {
  let result:number = 0;
  let p1Sum:number = await sumValues(p1);
  let p2Sum:number = await sumValues(p2);

  if(p1Sum > p2Sum){
    result = p1Sum - p2Sum;
  }else{
    result = p2Sum - p1Sum;
  }

  let output:string = `p1 exp ${p1Sum} | p2 exp ${p2Sum}`
  return (result <= 10) ? `Fair: ${output}` : `Not fair: ${output}`;
}