var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import dotenv from 'dotenv';
dotenv.config();
import fetch from "node-fetch";
import https from 'https';
export var getFFData = (function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        https.get("https://fantasy.premierleague.com/api/bootstrap-static/", function (resp) {
            var data = '';
            // A chunk of data has been recieved.
            resp.on('data', function (chunk) { return data += chunk; });
            // The whole response has been received. Send the result as JSON.
            resp.on('end', function () {
                var JSONData = JSON.parse(data);
                var customResponse = {
                    "players": JSONData.elements,
                    "teams": JSONData.teams
                };
                response.send(customResponse);
            });
        }).on("error", function (err) {
            return "Error: " + err.message;
        });
        return [2 /*return*/];
    });
}); });
export var getTeamID = (function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var team, token, fetchOptions;
    return __generator(this, function (_a) {
        team = request.body.id;
        token = process.env.FANTASY_KEY;
        fetchOptions = {
            method: "GET",
            headers: {
                "X-Auth-Token": token
            },
        };
        fetch("https://api.football-data.org/v2/competitions/2021/teams", fetchOptions)
            .then(function (res) { return res.json(); })
            .then(function (res) {
            response.send({
                matchday: res.season.currentMatchday,
                team: res.teams.filter(function (resTeam) { return resTeam.tla === team; })[0]
            });
        });
        return [2 /*return*/];
    });
}); });
export var getTeamFixtures = (function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var teamID, token, fetchOptions;
    return __generator(this, function (_a) {
        teamID = request.body.id;
        token = process.env.FANTASY_KEY;
        fetchOptions = {
            method: "GET",
            headers: {
                "X-Auth-Token": token
            },
        };
        fetch("https://api.football-data.org/v2/teams/" + teamID + "/matches/?status=SCHEDULED&competitions=2021", fetchOptions)
            .then(function (res) { return res.json(); })
            .then(function (res) {
            if (res.matches) {
                response.send(res.matches);
            }
        });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=fantasyController.js.map