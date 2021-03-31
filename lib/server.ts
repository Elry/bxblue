import dotenv from "dotenv";
import axios, {AxiosResponse, AxiosError} from "axios";
import express, {Request, Response, NextFunction} from "express";

dotenv.config();

const app = express();

// home
app.get("/", (req:Request, res:Response) => res.json("Bxblue pokemon calculator"));

// get err
app.use((err, req:Request, res:Response, next:NextFunction) => {
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

// main
app.get("/api", async (req:Request, res:Response):Promise<void> => {
  const p1 = [
    {"id": 12},
    {"id": 11}
  ];
  
  const p2 = [
    {"id": 12},
    {"id": 11}
  ];
  
  let p1Check:string = checkSize(p1, "p1");
  let p2Check:string = checkSize(p2, "p2");  

  if(p1Check || p2Check){
    res.status(400).json(p1Check + " " + p2Check);
    return;
  }

  try{
    let fair:boolean|string = await checkFairness(p1, p2);

    if(fair){ res.status(200).json(fair); }
    else{ res.status(500).json("Error"); }
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

const sumValues = async (val:object):Promise<number> => {
  let sum:number = 0;

  for(let i in val){
    sum += await getBaseExp(val[i].id);
  }

  return sum;
}

const checkFairness = async (p1:Object, p2:Object):Promise<boolean|string> => {
  let result:number = 0;

  try{
    let p1Sum:number = await sumValues(p1);
    let p2Sum:number = await sumValues(p2);

    if(p1Sum > p2Sum){
      result = p1Sum - p2Sum;
    }else{
      result = p2Sum - p1Sum;
    } 

    return (result <= 5) ? "Fair" : "Not fair";
  }catch(err){
    console.log("Fairness check err:", err);
    return false;
  }
}

// get base experience
const getBaseExp = async (id:number):Promise<number> => {
  try {
    const resp = await axios.get(`https://${process.env.POKEURI}` + id);
    return resp.data.base_experience;
  } catch (err) {
    return 0;
  }
}