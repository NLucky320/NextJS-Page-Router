import dns from 'dns';
import { MongoClient } from 'mongodb';

// Node's resolver was pointing at 127.0.0.1 (no DNS server there), which
// breaks the SRV lookup for mongodb+srv:// URIs. Use public DNS instead.
dns.setServers(['8.8.8.8', '1.1.1.1']);

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;



        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('Missing MONGODB_URI');

        const client = new MongoClient(uri);

        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted!' });
    }
}

export default handler;