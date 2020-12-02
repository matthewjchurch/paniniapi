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
exports.getFFData = void 0;
const https_1 = __importDefault(require("https"));
exports.getFFData = ((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    https_1.default.get("https://fantasy.premierleague.com/api/bootstrap-static/", (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => data += chunk);
        // The whole response has been received. Send the result as JSON.
        resp.on('end', () => {
            const JSONData = JSON.parse(data);
            const customResponse = {
                "players": JSONData.elements,
                "teams": JSONData.teams
            };
            response.send(customResponse);
        });
    }).on("error", (err) => {
        alert("Error: " + err.message);
    });
}));
