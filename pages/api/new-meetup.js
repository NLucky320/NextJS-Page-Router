// /api/new-meetup
import { MongoClient } from 'mongodb';


async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('Missing MONGODB_URI environment variable');

const client = new MongoClient(uri);

        const db = client.db('meetups');
        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;