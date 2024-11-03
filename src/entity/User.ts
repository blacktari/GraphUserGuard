import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn() // Using ObjectIdColumn for MongoDB
  id!: ObjectID;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field({ complexity: 3 })
  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Field()
  @Column("text", { unique: true })
  email!: string;

  @Column()
  password!: string; // Handling password hashing

  @Column("bool", { default: false })
  confirmed!: boolean;

  constructor() {
    super();
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.confirmed = false;
  }
}