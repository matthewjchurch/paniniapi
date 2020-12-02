// Use ES6 Imports for mongodb and our mongo client
import dotenv from 'dotenv';
dotenv.config();
import mongodb from 'mongodb';
const mongoClient = mongodb.MongoClient;

const dbName = "players";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xmfro.mongodb.net/players?retryWrites=true&w=majority`

export const getCollectionDocuments = async (collectionName: string, data: any) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    const dataCollection = await mongo.db(dbName).collection(collectionName).find({uid: data.uid}).toArray();
    // Close our connection
    mongo.close();
    return dataCollection;
}
export const createCollectionDocument = async (collectionName: string, data: any) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
        if (!data._id) {
            data._id = data.uid;
            await mongo.db(dbName).collection(collectionName).insertOne(data)
        } else {
            updateCollectionDocument(collectionName, data);
        }
    mongo.close();
}
export const updateCollectionDocument = async (collectionName: string, data: any) => {
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })

    await mongo.db(dbName).collection(collectionName).updateOne(
        { uid: data.uid },
        {
            $addToSet: { watchlist: data }, // addToSet only pushes if the value isn't present
        }
    )
    mongo.close();
}
export const deleteCollectionDocument = async (collectionName: string, data: any) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    try {
        await mongo.db(dbName).collection(collectionName)
            .updateOne({ uid: data.uid },
            { $pull: { 'watchlist': { id: data.id } } })
    } catch(e) {
        return e;
    }
    // Close our connection
    mongo.close();
}