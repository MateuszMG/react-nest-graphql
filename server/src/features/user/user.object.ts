import { Field, ObjectType } from '@nestjs/graphql';
import { UserRoles } from './user.model';

@ObjectType()
export class AccessToken {
  @Field()
  accessToken: string;
}

@ObjectType()
export class DecodedUser {
  @Field()
  id: string;
  @Field()
  username: string;
  @Field()
  email: string;
  @Field(() => [String])
  roles: UserRoles[];
}
