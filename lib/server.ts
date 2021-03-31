import axios from "axios";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

const enableCORS = function (req, res, next) {
    if (!process.env.DISABLE_XORIGIN) {
      /* Test only*/
      const allowedOrigins = ["*"]; 
      const origin = req.headers.origin;
      /* Test only*/
  
      if (!process.env.XORIGIN_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
        res.set({
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, POST",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        });
      }
    }
    next();
};

// home
app.get("/", (req, res) => res.json("Bxblue pokemon calculator"));

// get err
app.use(function(err, req, res, next){
  if(err){
    res.status(err.status || 500)
    .type("json")
    .send(err.message || "server error");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Running at https://${process.env.HOSTNAME}:${process.env.PORT}`);
});

app.get("/api", async (req, res) => {
  let baseExp:number = await getBaseExp(12);
  res.json(baseExp);
});

const getBaseExp = (id:number):Promise<number> => {
  return axios.get(`https://${process.env.POKEURI}` + id)
    .then(resp => {      
      return resp.data.base_experience;
    })
    .catch(err => {
      console.log(err);
      return 0;
    });
}