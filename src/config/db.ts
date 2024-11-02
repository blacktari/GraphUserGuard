import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('GraphUserGuardDb'); 
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export { connectDB };