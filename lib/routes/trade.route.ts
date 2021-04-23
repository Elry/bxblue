import { Router } from "express";

const router:Router = Router();

import { tradeList, tradeCheck } from "../controllers/trade.controller";

router.get('/list', tradeList);
router.post('/check', tradeCheck);

export default router;