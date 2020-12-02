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
exports.deleteCollectionDocument = exports.updateCollectionDocument = exports.createCollectionDocument = exports.getCollectionDocuments = void 0;
// Use ES6 Imports for mongodb and our mongo client
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongodb_1 = __importDefault(require("mongodb"));
const mongoClient = mongodb_1.default.MongoClient;
const dbName = "players";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xmfro.mongodb.net/players?retryWrites=true&w=majority`;
const getCollectionDocuments = (collectionName, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Connect to our database / open our connection
    const mongo = yield mongoClient.connect(uri, { useUnifiedTopology: true });
    // Retrieve our collection
    const dataCollection = yield mongo.db(dbName).collection(collectionName).find({ uid: data.uid }).toArray();
    // Close our connection
    mongo.close();
    return dataCollection;
});
exports.getCollectionDocuments = getCollectionDocuments;
const createCollectionDocument = (collectionName, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Connect to our database / open our connection
    const mongo = yield mongoClient.connect(uri, { useUnifiedTopology: true });
    if (!data._id) {
        data._id = data.uid;
        yield mongo.db(dbName).collection(collectionName).insertOne(data);
    }
    else {
        exports.updateCollectionDocument(collectionName, data);
    }
    mongo.close();
});
exports.createCollectionDocument = createCollectionDocument;
const updateCollectionDocument = (collectionName, data) => __awaiter(void 0, void 0, void 0, function* () {
    const mongo = yield mongoClient.connect(uri, { useUnifiedTopology: true });
    yield mongo.db(dbName).collection(collectionName).updateOne({ uid: data.uid }, {
        $addToSet: { watchlist: data },
    });
    mongo.close();
});
exports.updateCollectionDocument = updateCollectionDocument;
const deleteCollectionDocument = (collectionName, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Connect to our database / open our connection
    const mongo = yield mongoClient.connect(uri, { useUnifiedTopology: true });
    // Retrieve our collection
    try {
        yield mongo.db(dbName).collection(collectionName)
            .updateOne({ uid: data.uid }, { $pull: { 'watchlist': { id: data.id } } });
    }
    catch (e) {
        alert(e);
    }
    // Close our connection
    mongo.close();
});
exports.deleteCollectionDocument = deleteCollectionDocument;
module.exports = {};
