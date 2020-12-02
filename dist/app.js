"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var fantasyController_js_1 = require("./controllers/fantasyController.js");
var mongoController_js_1 = require("./controllers/mongoController.js");
// 1. Create our express API
var app = express_1.default();
// NOTE: let's allow requests from ALL ORIGINS
app.use(cors_1.default());
app.use(body_parser_1.default.json());
var PORT = process.env.PORT || 3000;
app.get("/ffdata", fantasyController_js_1.getFFData);
app.post('/getWatchlist', mongoController_js_1.getWatchlist);
app.post('/createUser', mongoController_js_1.createUser);
app.post('/addPlayer', mongoController_js_1.addPlayer);
app.delete('/removePlayer', mongoController_js_1.removePlayer);
// 3. Finally! Listen on your port
// app.listen(PORT, () => {
//     // tslint:disable-next-line:no-console
//     console.log(`Our app is running on port ${ PORT }`);
// });
app.listen(8080);
