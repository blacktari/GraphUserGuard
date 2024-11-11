import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../entity/User';
import { RegisterInput } from '../inputs/RegisterInput';
import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';

@Resolver()
export class AuthResolver {
  @Mutation(() => User)
  async register(
    @Arg('data') data: RegisterInput
  ): Promise<User> {
    const userRepository = getRepository(User);

    // Hash password if it exists
    const hashedPassword = data.password ? await bcrypt.hash(data.password, 12) : '';

    const user = userRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    });

    await userRepository.save(user);
    return user;
  }
}