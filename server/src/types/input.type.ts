import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class IdInput {
  @Field() @IsString() @MinLength(4) id: string;
}
