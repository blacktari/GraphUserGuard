import { Arg, ID, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { ObjectID } from "typeorm";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const user = User.create({ firstName, lastName, email, password });
    await user.save();
    return user;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => ID) id: string): Promise<User | undefined> { // Using ID type for MongoDB
    const user = await User.findOne({ where: { id: new ObjectID(id) } }); 
    return user || undefined; // Return undefined if not found
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => ID) id: string): Promise<boolean> { // Using ID type for MongoDB
    const result = await User.delete({ id: new ObjectID(id) }); 
    return result.affected !== 0; // Return true if deleted
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id", () => ID) id: string, // Using ID type for MongoDB
    @Arg("firstName", { nullable: true }) firstName?: string,
    @Arg("lastName", { nullable: true }) lastName?: string,
    @Arg("email", { nullable: true }) email?: string
  ): Promise<User | undefined> {
    const user = await User.findOne({ where: { id: new ObjectID(id) } });
    if (!user) return undefined;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    await user.save();
    return user;
  }
}