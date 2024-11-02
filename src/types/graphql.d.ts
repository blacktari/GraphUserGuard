import { GraphQLResolveInfo } from "graphql";
import { User } from "../entity/User";

export type ResolverFn<T> = (
  parent: any,
  args: any,
  context: any,
  info: GraphQLResolveInfo
) => Promise<T> | T;

export interface Context {
  user?: User;
}
