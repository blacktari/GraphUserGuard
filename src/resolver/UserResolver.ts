import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { ObjectId } from "mongodb";

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
  async user(@Arg("id", () => ID) id: string): Promise<User | undefined> {
    // Convert string to ObjectId and query by the actual _id field
    return await User.findOne({ where: { _id: new ObjectId(id) } });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => ID) id: string): Promise<boolean> {
    const result = await User.delete({ _id: new ObjectId(id) });
    return result.affected !== 0; // Return true if deletion was successful
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id", () => ID) id: string,
    @Arg("firstName", { nullable: true }) firstName?: string,
    @Arg("lastName", { nullable: true }) lastName?: string,
    @Arg("email", { nullable: true }) email?: string
  ): Promise<User | undefined> {
    const user = await User.findOne({ where: { _id: new ObjectId(id) } });
    if (!user) return undefined;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    await user.save();
    return user;
  }
}