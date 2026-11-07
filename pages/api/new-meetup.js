// /api/new-meetup
import { MongoClient } from 'mongodb';


async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;


        const client = new MongoClient("mongodb+srv://lucky:7LNKndqSNdOiSnOb@cluster0.34pjbsz.mongodb.net/");
        const db = client.db('meetups');
        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;