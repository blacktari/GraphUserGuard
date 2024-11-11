import { buildSchema } from "type-graphql";
import { AuthResolver } from "../resolver/AuthResolver";
import { UserResolver } from "../resolver/UserResolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [AuthResolver, UserResolver],
    validate: false,
  });
