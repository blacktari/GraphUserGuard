import { Entity, ObjectIdColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn() // Maps to MongoDB's _id field
  _id!: ObjectId;

  // Alias for _id to use with Type-GraphQL
  @Field(() => ID)
  get id(): string {
    return this._id.toHexString();
  }

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
  password!: string;

  @Column("bool", { default: false })
  confirmed!: boolean;
}