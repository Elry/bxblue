"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = express_1.default();
// home
app.get("/", (req, res) => res.json("Bxblue pokemon calculator"));
app.use(express_1.default.json());
// get err
app.use((err, req, res, next) => {
    if (err) {
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
app.post("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // variables to use as example in case none is given
    const p1Ex = [
        { "id": 1 },
        { "id": 2 }
    ];
    const p2Ex = [
        { "id": 3 },
        { "id": 4 }
    ];
    const user1 = req.body.users.p1.name ? req.body.users.p1.name : "p1";
    const user2 = req.body.users.p2.name ? req.body.users.p2.name : "p2";
    const p1 = req.body.users.p1.pokemons ? req.body.users.p1.pokemons : p1Ex;
    const p2 = req.body.users.p2.pokemons ? req.body.users.p2.pokemons : p2Ex;
    try {
        let p1Check = checkSize(p1, "p1");
        let p2Check = checkSize(p2, "p2");
        // checking size between 1 and 6
        if (p1Check || p2Check) {
            res.status(400).json(p1Check + " " + p2Check);
            return;
        }
        let fair = yield checkFairness(p1, p2);
        if (fair) {
            res.status(200).json(fair);
        }
        else {
            throw 0;
        }
    }
    catch (err) {
        res.status(500).json(`Error: ${err}`);
    }
}));
const checkSize = (obj, name) => {
    if (obj.length < 1) {
        return `${name} must provide at least one pokemon`;
    }
    else if (obj.length > 6) {
        return `${name} must provide a maximum of 6 pokemons`;
    }
    return "";
};
// get base experience
const getBaseExp = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield axios_1.default.get(`https://${process.env.POKEURI}` + id);
    return resp.data.base_experience;
});
const sumValues = (val) => __awaiter(void 0, void 0, void 0, function* () {
    let sum = 0;
    for (let i in val) {
        sum += yield getBaseExp(val[i].id);
    }
    return sum;
});
const checkFairness = (p1, p2) => __awaiter(void 0, void 0, void 0, function* () {
    let result = 0;
    let p1Sum = yield sumValues(p1);
    let p2Sum = yield sumValues(p2);
    if (p1Sum > p2Sum) {
        result = p1Sum - p2Sum;
    }
    else {
        result = p2Sum - p1Sum;
    }
    let output = `p1 exp ${p1Sum} | p2 exp ${p2Sum}`;
    return (result <= 10) ? `Fair: ${output}` : `Not fair: ${output}`;
});
//# sourceMappingURL=server.js.map