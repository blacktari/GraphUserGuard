// src/schema/schema.ts
import { buildSchema } from "type-graphql";
import { UserResolver } from "../src/resolver/UserResolver";

export const createSchema = () => {
  return buildSchema({
    resolvers: [UserResolver],
    validate: false, // Disable validation for simplicity; enable as needed
  });
};
