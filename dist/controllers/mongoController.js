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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePlayer = exports.addPlayer = exports.createUser = exports.getWatchlist = void 0;
const db_1 = require("../db");
exports.getWatchlist = ((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    const watchlist = yield db_1.getCollectionDocuments("users", data);
    response.send(watchlist);
}));
exports.createUser = ((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.body;
    const posting = yield db_1.createCollectionDocument('users', user);
    response.send(user);
}));
exports.addPlayer = ((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    const posting = yield db_1.updateCollectionDocument('users', data);
    response.send(data);
}));
exports.removePlayer = ((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const deletePlayer = yield db_1.deleteCollectionDocument('users', request.body);
    response.send({ response: 'delete successful' });
}));
