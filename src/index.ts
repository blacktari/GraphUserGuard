import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/UserResolver";
import { connectDB } from ".//config/db"; 

async function main() {
  // Connect to MongoDB
  const db = await connectDB(); // Use the connectDB function to establish the connection
  console.log("Connected to MongoDB");

  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  // Create Apollo Server
  const server = new ApolloServer({ schema });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log("Server ready at http://localhost:4000/graphql");
  });
}

main().catch((error) => console.error(error));