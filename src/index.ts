import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/UserResolver";
import { MongoClient } from "mongodb";

async function main() {
  // Connect to MongoDB
  const uri = "mongodb://localhost:27017"; 
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("GraphUserGuardDb"); 
    const usersCollection = db.collection("users");


    // Build GraphQL schema
    const schema = await buildSchema({
      resolvers: [UserResolver],
    });

    // Create Apollo Server
    const server = new ApolloServer({ schema, context: () => ({ db }) });

    const app = express();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
      console.log("Server ready at http://localhost:4000/graphql");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

main().catch((error) => console.error(error));
