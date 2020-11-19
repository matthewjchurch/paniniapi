// Use ES6 Imports for mongodb and our mongo client
import dotenv from 'dotenv';
dotenv.config();
import mongodb from 'mongodb';
const mongoClient = mongodb.MongoClient;

let dbName = "players";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xmfro.mongodb.net/players?retryWrites=true&w=majority`

export const getCollectionDocuments = async (collectionName) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    const dataCollection = await mongo.db(dbName).collection(collectionName).find({}).toArray();
    // Close our connection
    mongo.close();
    return dataCollection;
}
export const createCollectionDocument = async (collectionName, data) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // const existingPlayer = await mongo.db('players').collection('players').find({data});
    // console.log(existingPlayer);
    // Create our document
    // if (!existingPlayer){
        if (!data._id) {
            data._id = data.uid;
            await mongo.db(dbName).collection(collectionName).insertOne(data)
        } else {
            updateCollectionDocument(collectionName, data);
        } 
    // } else {
    //     response.send({response: "player already exists"})
    // }
    // Close our connection
    mongo.close();
}
export const updateCollectionDocument = async (collectionName, data) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    var myquery = { _id: new mongodb.ObjectID(data._id) };
    var newvalues = { $set: data };
    await mongo.db(dbName).collection(collectionName).replaceOne(
        { _id : data._id },
        data, 
        { upsert: true} 
    );
    // Close our connection
    mongo.close();
}
export const deleteCollectionDocument = async (collectionName, data) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    try {
        await mongo.db(dbName).collection(collectionName).deleteOne(
            { name : data }
        );
    } catch(e) {
        console.log(e);
    }
    // Close our connection
    mongo.close();
}