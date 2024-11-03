import { createConnection } from "typeorm";
import { User } from "../src/entity/User";

describe("User CRUD", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    await User.clear();
  });

  test("should create a user", async () => {
    const user = await User.create({
      firstName: "Tari",
      lastName: "Osadebe",
      email: "tari.osadebe@example.com",
      password: "password123",
    }).save();
    expect(user.id).toBeDefined();
  });

  
});