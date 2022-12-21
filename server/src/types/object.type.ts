import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResMessage {
  @Field()
  message: string;
}

@ObjectType()
export class ResId {
  @Field()
  id: string;
}
