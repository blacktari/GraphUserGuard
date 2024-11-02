import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

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
  async user(@Arg("id", () => Int) id: number): Promise<User | undefined> {
    const user = await User.findOne({ where: { id } }); // Correct usage
    return user || undefined; // Return undefined if not found
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean> {
    await User.delete(id);
    return true;
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("firstName", { nullable: true }) firstName?: string,
    @Arg("lastName", { nullable: true }) lastName?: string,
    @Arg("email", { nullable: true }) email?: string
  ): Promise<User | undefined> {
    const user = await User.findOne({ where: { id } }); 
    if (!user) return undefined;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    await user.save();
    return user;
  }
}