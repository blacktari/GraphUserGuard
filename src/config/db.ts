import { createConnection } from 'typeorm';
import { User } from "../entity/User";

async function connectDB() {
    try {
        const connection = await createConnection({
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            database: 'GraphUserGuardDb',
            synchronize: true,
            useUnifiedTopology: true, // Importanted to avoid deprecation warnings
            entities: [User],
        });
        
        if (connection ) {console.log('Connected to MongoDB with TypeORM')};
        return connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export { connectDB };