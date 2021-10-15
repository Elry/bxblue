import cors from "cors";
import dotenv from "dotenv";
import corsConfig from './utils/cors';
import swaggerDoc from '../swagger.json';
import swaggerUi from "swagger-ui-express";
import tradeRoute from "./routes/trade.route";
import express, {Request, Response, NextFunction} from "express";

dotenv.config();

const app = express();

// reading received json data with default express
app.use(express.json());

// setting basic cors
app.use(cors(corsConfig));

// home
app.get('/', (req:Request, res:Response):void => { 
  res.status(200).json("PokeTrade: pokemon trade fairness calculator");
});

// routes
app.use('/api/trade', tradeRoute);

// swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// initial listener
app.listen(process.env.PORT, ():void => console.log('Server started successfully'));